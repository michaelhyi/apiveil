#include <iostream>

#include <Poco/Net/HTTPServer.h>
#include <Poco/Net/HTTPServerParams.h>
#include <Poco/Net/ServerSocket.h>
#include <Poco/Net/SSLManager.h>

#include "proxy_server_application.h"
#include "proxy_request_handler_factory.h"

using namespace Poco::Net;

int ProxyServerApp::main(const std::vector<std::string> &args)
{
    Poco::Net::initializeSSL();
    ServerSocket svs(4000);
    HTTPServer server(new ProxyRequestHandlerFactory, svs, new HTTPServerParams);
    server.start();
    std::cout << "Proxy server listening on port 4000" << std::endl;

    waitForTerminationRequest();
    server.stop();
    Poco::Net::uninitializeSSL();
    return Application::EXIT_OK;
}