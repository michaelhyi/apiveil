#include <Poco/Net/HTTPServer.h>
#include <Poco/Net/HTTPRequestHandler.h>
#include <Poco/Net/HTTPRequestHandlerFactory.h>
#include <Poco/Net/HTTPServerParams.h>
#include <Poco/Net/ServerSocket.h>
#include <Poco/Util/ServerApplication.h>
#include <Poco/StreamCopier.h>
#include <iostream>
#include <sstream>
#include <Poco/Net/HTTPServerRequest.h>
#include <Poco/Net/HTTPServerResponse.h>

using namespace Poco::Net;
using namespace Poco::Util;
using namespace std;

class EchoRequestHandler : public HTTPRequestHandler
{
public:
    void handleRequest(HTTPServerRequest& request, HTTPServerResponse& response) override
    {
        std::stringstream bodyStream;
        Poco::StreamCopier::copyStream(request.stream(), bodyStream);
        std::string body = bodyStream.str();

        std::cout << "Echo server received: " << body << std::endl;

        response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);;
        response.setContentType("application/json");
        response.send() << body;
    }
};

class EchoRequestHandlerFactory : public HTTPRequestHandlerFactory
{
public:
    HTTPRequestHandler* createRequestHandler(const HTTPServerRequest& request) override
    {
        return new EchoRequestHandler;
    }
};

class EchoServerApp : public ServerApplication
{
protected:
    int main(const std::vector<std::string>& args) override
    {
        // Start the echo server on port 4000.
        ServerSocket svs(4000);
        HTTPServer server(new EchoRequestHandlerFactory, svs, new HTTPServerParams);
        server.start();
        std::cout << "Echo server listening on port 4000" << std::endl;

        waitForTerminationRequest();
        server.stop();
        return Application::EXIT_OK;
    }
};

int main(int argc, char** argv)
{
    EchoServerApp app;
    return app.run(argc, argv);
}

