#include <Poco/StreamCopier.h>
#include <Poco/JSON/Array.h>
#include <Poco/JSON/Object.h>
#include <Poco/JSON/Parser.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPSClientSession.h>

#include "include/nlohmann/json.hpp"
#include "network_log.h"
#include "proxy_request_handler.h"
#include "proxy_request_handler_util.h"
#include "openai_service.h"
#include "web_socket_manager.h"

using namespace Poco::JSON;
using namespace Poco;

const std::string BASE_API_HOST = "api.openweathermap.org";

void ProxyRequestHandler::handleRequest(HTTPServerRequest &request, HTTPServerResponse &response)
{
    std::string request_body = getBody(request);
    std::unordered_map<std::string, std::string> request_headers = getHeaders(request);

    std::cout << "Received request for " << request.getURI() << "\n";
    std::cout << "Request body: " << request_body << "\n";

    nlohmann::json request_headers_json(request_headers);
    std::cout << "Request headers: " << request_headers_json.dump() << "\n";
    
    NetworkLog network_log = NetworkLog(
        request.getMethod(),
        request.getURI(),
        request_body,
        request_headers,
        100
    );

    WebSocketManager::getInstance().broadcastMessage(network_log.toJson());

    try
    {
        HTTPSClientSession session(BASE_API_HOST, 443);
        std::ostream &baseOs = session.sendRequest(request);
        HTTPResponse network_response;
        std::istream &baseIs = session.receiveResponse(network_response);

        std::unordered_map<std::string, std::string> response_headers = getHeaders(network_response);
    
        std::stringstream baseResponseStream;
        Poco::StreamCopier::copyStream(baseIs, baseResponseStream);
        std::string network_response_body = baseResponseStream.str();

        NetworkLog network_response_log = NetworkLog(
            request.getMethod(),
            request.getURI(),
            network_response_body,
            response_headers,
            network_response.getStatus()
        );

        std::cout << "network response log: " << network_response_log.toJson() << "\n";

        WebSocketManager::getInstance().broadcastMessage(network_response_log.toJson());

        response.setStatus(network_response.getStatus());
        response.send() << network_response_body;
    }

    catch (Exception &ex)
    {
        std::cerr << "Error forwarding to base API: " << ex.displayText() << "\n";
        response.setStatus(HTTPResponse::HTTP_INTERNAL_SERVER_ERROR);
        response.send() << "Error forwarding processed request to base API.";
        return;
    }
}