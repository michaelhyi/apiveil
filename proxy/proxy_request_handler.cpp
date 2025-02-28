#include <Poco/StreamCopier.h>
#include <Poco/JSON/Array.h>
#include <Poco/JSON/Object.h>
#include <Poco/JSON/Parser.h>
#include <Poco/Net/HTTPServerRequest.h>

#include "proxy_request_handler.h"
#include "openai_service.h"
#include "proxy_util.h"
#include "web_socket_manager.h"

using namespace Poco::JSON;
using namespace Poco;

void ProxyRequestHandler::handleRequest(HTTPServerRequest &request, HTTPServerResponse &response)
{
    // Get the Incoming Request
    std::stringstream incomingStream;
    Poco::StreamCopier::copyStream(request.stream(), incomingStream);
    std::string incomingBody = incomingStream.str();

    std::cout << "Received request for " << request.getURI() << std::endl;
    std::cout << "Request body: " << incomingBody << std::endl;

    Object jsonObj;
    jsonObj.set("event", "http_request");
    jsonObj.set("uri", request.getURI());
    jsonObj.set("body", incomingBody);

    std::stringstream jsonStream;
    jsonObj.stringify(jsonStream);
    std::string jsonMessage = jsonStream.str();

    WebSocketManager::getInstance().broadcastMessage(jsonMessage);

    // Send HTTP response
    response.setStatus(HTTPResponse::HTTP_OK);
    response.setContentType("application/json");
    response.send() << "{ \"status\": \"received\" }";

    // std::string processed_text = "";
    // try
    // {
    //     processed_text = getProcessedText(incomingBody, response);
    // }
    // catch (Exception &ex)
    // {
    //     std::cerr << "Error calling OpenAI API: " << ex.displayText() << std::endl;
    //     response.setStatus(HTTPResponse::HTTP_INTERNAL_SERVER_ERROR);
    //     response.send() << "Error processing request with OpenAI API.";
    //     return;
    // }

    // try
    // {
    //     std::string base_api_response = forwardRequest(processed_text);
    //     response.setStatus(HTTPResponse::HTTP_OK);
    //     response.send() << base_api_response;
    // }
    // catch (Exception &ex)
    // {
    //     std::cerr << "Error forwarding to base API: " << ex.displayText() << std::endl;
    //     response.setStatus(HTTPResponse::HTTP_INTERNAL_SERVER_ERROR);
    //     response.send() << "Error forwarding processed request to base API.";
    //     return;
    // }
}