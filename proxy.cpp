#include <Poco/Net/HTTPServer.h>
#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPRequestHandlerFactory.h>
#include <Poco/Net/HTTPServerParams.h>
#include <Poco/Net/HTTPClientSession.h>
#include <Poco/Net/HTTPSClientSession.h>
#include <Poco/Net/HTTPRequest.h>
#include <Poco/Net/HTTPResponse.h>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>
#include <Poco/Net/ServerSocket.h>
#include <Poco/Util/ServerApplication.h>
#include <Poco/StreamCopier.h>
#include <Poco/JSON/Parser.h>
#include <Poco/JSON/Object.h>
#include <Poco/JSON/Array.h>
#include <Poco/Dynamic/Var.h>
#include <Poco/Net/SSLManager.h>
#include <Poco/Net/Context.h>
#include <Poco/Net/AcceptCertificateHandler.h>
#include <sstream>
#include <iostream>
#include <string>
#include <cstdlib>

using namespace Poco::Net;
using namespace Poco::Util;
using namespace Poco::JSON;
using namespace Poco;
using namespace std;

//THis is just for openai configs
const std::string OPENAI_API_HOST = "api.openai.com";
const int OPENAI_API_PORT = 443;
const std::string OPENAI_API_PATH = "/v1/chat/completions";
//API configs + port configs
const std::string BASE_API_HOST = "127.0.0.1";
const int BASE_API_PORT = 4000;
const std::string BASE_API_PATH = "/echo";

class ProxyRequestHandler : public HTTPRequestHandler
{
public:
    void handleRequest(HTTPServerRequest& request, HTTPServerResponse& response) override
    {
        // Get the Incoming Request
        std::stringstream incomingStream;
        Poco::StreamCopier::copyStream(request.stream(), incomingStream);
        std::string incomingBody = incomingStream.str();
        
        std::cout << "Received request for " << request.getURI() << std::endl;
        std::cout << "Request body: " << incomingBody << std::endl;

        std::string processedText;
        try {
            // we build a json payload for openai api. we will prolly swap this out later
            std::stringstream jsonStream;
            jsonStream << "{";
            jsonStream << "\"model\": \"gpt-3.5-turbo\",";
            jsonStream << "\"messages\": [ { \"role\": \"user\", \"content\": \"Process this request: " << incomingBody << "\" } ],";
            jsonStream << "\"max_tokens\": 50";
            jsonStream << "}";
            std::string jsonPayload = jsonStream.str();
            
            Poco::Net::Context::Ptr context = new Poco::Net::Context(Poco::Net::Context::CLIENT_USE, "", "", "", Poco::Net::Context::VERIFY_NONE);
            HTTPSClientSession httpsSession(OPENAI_API_HOST, OPENAI_API_PORT, context);

            HTTPRequest openaiRequest(HTTPRequest::HTTP_POST, OPENAI_API_PATH, HTTPMessage::HTTP_1_1);
            openaiRequest.setContentType("application/json");

            const char* openai_api_key = std::getenv("OPENAI_API_KEY");
            if (openai_api_key)
                openaiRequest.set("Authorization", std::string("Bearer ") + openai_api_key);
            else {
                response.setStatus(HTTPResponse::HTTP_INTERNAL_SERVER_ERROR);
                response.send() << "Error: OPENAI_API_KEY environment variable not set.";
                return;
            }
            openaiRequest.setContentLength(jsonPayload.length());

            std::ostream& os = httpsSession.sendRequest(openaiRequest);
            os << jsonPayload;

            HTTPResponse openaiResponse;
            std::istream& is = httpsSession.receiveResponse(openaiResponse);
            std::stringstream responseStream;
            Poco::StreamCopier::copyStream(is, responseStream);
            std::string openaiResponseBody = responseStream.str();
            std::cout << "OpenAI API response: " << openaiResponseBody << std::endl;

            Parser parser;
            Dynamic::Var result = parser.parse(openaiResponseBody);
            Object::Ptr jsonObject = result.extract<Object::Ptr>();
            auto choicesVar = jsonObject->get("choices");
            Array::Ptr choicesArray = choicesVar.extract<Array::Ptr>();
            if (!choicesArray->empty()) {
                Object::Ptr firstChoice = choicesArray->getObject(0);
                Object::Ptr messageObj = firstChoice->getObject("message");
                processedText = messageObj->getValue<std::string>("content");
            }
            else {
                processedText = "No result from OpenAI API.";
            }
        }
        catch (Exception& ex) {
            std::cerr << "Error calling OpenAI API: " << ex.displayText() << std::endl;
            response.setStatus(HTTPResponse::HTTP_INTERNAL_SERVER_ERROR);
            response.send() << "Error processing request with OpenAI API.";
            return;
        }

        // Forward our process text to base api
        std::string baseApiResponse;
        try {
            HTTPClientSession baseSession(BASE_API_HOST, BASE_API_PORT);
            HTTPRequest baseRequest(HTTPRequest::HTTP_POST, BASE_API_PATH, HTTPMessage::HTTP_1_1);
            baseRequest.setContentType("application/json");
            std::stringstream baseJsonStream;
            baseJsonStream << "{ \"processed\": \"" << processedText << "\" }";
            std::string baseJsonPayload = baseJsonStream.str();
            baseRequest.setContentLength(baseJsonPayload.length());

            // Send to base API.
            std::ostream& baseOs = baseSession.sendRequest(baseRequest);
            baseOs << baseJsonPayload;

            HTTPResponse baseResponse;
            std::istream& baseIs = baseSession.receiveResponse(baseResponse);
            std::stringstream baseResponseStream;
            Poco::StreamCopier::copyStream(baseIs, baseResponseStream);
            baseApiResponse = baseResponseStream.str();
            std::cout << "Base API response: " << baseApiResponse << std::endl;
        }
        catch (Exception& ex) {
            std::cerr << "Error forwarding to base API: " << ex.displayText() << std::endl;
            response.setStatus(HTTPResponse::HTTP_INTERNAL_SERVER_ERROR);
            response.send() << "Error forwarding processed request to base API.";
            return;
        }

        response.setStatus(HTTPResponse::HTTP_OK);
        response.send() << baseApiResponse;
    }
};

class ProxyRequestHandlerFactory : public HTTPRequestHandlerFactory
{
public:
    HTTPRequestHandler* createRequestHandler(const HTTPServerRequest& request) override
    {
        return new ProxyRequestHandler;
    }
};

class ProxyServerApp : public ServerApplication
{
protected:
    int main(const std::vector<std::string>& args) override
    {
        ServerSocket svs(3000);
        HTTPServer server(new ProxyRequestHandlerFactory, svs, new HTTPServerParams);
        server.start();
        std::cout << "Proxy server listening on port 3000" << std::endl;

        waitForTerminationRequest();
        server.stop();
        return Application::EXIT_OK;
    }
};

int main(int argc, char** argv)
{
    Poco::Net::initializeSSL();
    int ret = ProxyServerApp().run(argc, argv);
    Poco::Net::uninitializeSSL();
    return ret;
}

