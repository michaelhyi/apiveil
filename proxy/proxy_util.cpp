#include <iostream>
#include <string>

#include <Poco/StreamCopier.h>
#include <Poco/Net/HTTPClientSession.h>
#include <Poco/Net/HTTPRequest.h>
#include <Poco/Net/HTTPResponse.h>
#include <Poco/Net/HTTPServerResponse.h>

#include "proxy_util.h"

using namespace Poco::Net;
using namespace Poco;

const std::string BASE_API_HOST = "127.0.0.1";
const std::string BASE_API_PATH = "/echo";
const int BASE_API_PORT = 4000;

std::string forwardRequest(std::string processed_text)
{
    std::string baseApiResponse;

    HTTPClientSession baseSession(BASE_API_HOST, BASE_API_PORT);
    HTTPRequest baseRequest(HTTPRequest::HTTP_POST, BASE_API_PATH, HTTPMessage::HTTP_1_1);
    baseRequest.setContentType("application/json");
    std::stringstream baseJsonStream;
    baseJsonStream << "{ \"processed\": \"" << processed_text << "\" }";
    std::string baseJsonPayload = baseJsonStream.str();
    baseRequest.setContentLength(baseJsonPayload.length());

    // Send to base API.
    std::ostream &baseOs = baseSession.sendRequest(baseRequest);
    baseOs << baseJsonPayload;

    HTTPResponse baseResponse;
    std::istream &baseIs = baseSession.receiveResponse(baseResponse);
    std::stringstream baseResponseStream;
    Poco::StreamCopier::copyStream(baseIs, baseResponseStream);
    baseApiResponse = baseResponseStream.str();
    std::cout << "Base API response: " << baseApiResponse << std::endl;
    return baseApiResponse;
}