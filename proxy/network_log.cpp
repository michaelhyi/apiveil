#include <Poco/JSON/Object.h>

#include "network_log.h"
#include "include/nlohmann/json.hpp"

using namespace Poco::JSON;

NetworkLog::NetworkLog(std::string network_traffic_id, std::string method, std::string path, time_t timestamp, std::string body, std::unordered_map<std::string, std::string> headers, int status_code)
{
    this->network_traffic_id = network_traffic_id;
    this->method = method;
    this->path = path;
    this->timestamp = timestamp;
    this->body = body;
    this->headers = headers;
    this->status_code = status_code;
}

NetworkLog::NetworkLog(std::string method, std::string path, std::string body, std::unordered_map<std::string, std::string> headers, int status_code)
{
    this->method = method;
    this->path = path;
    this->timestamp = time(nullptr);
    this->body = body;
    this->headers = headers;
    this->status_code = status_code;
}

std::string NetworkLog::getNetworkTrafficId() {
    return this->network_traffic_id;
}

std::string NetworkLog::getMethod() {
    return this->method;
}

std::string NetworkLog::getPath() {
    return this->path;
}

time_t NetworkLog::getTimestamp() {
    return this->timestamp;
}

std::string NetworkLog::getBody() {
    return this->body;
}

std::unordered_map<std::string, std::string> NetworkLog::getHeaders() {
    return this->headers;
}

int NetworkLog::getStatusCode() {
    return this->status_code;
}

void NetworkLog::setNetworkTrafficId(std::string network_traffic_id) {
    this->network_traffic_id = network_traffic_id;
}

void NetworkLog::setMethod(std::string method) {
    this->method = method;
}

void NetworkLog::setPath(std::string path) {
    this->path = path;
}

void NetworkLog::setTimestamp(time_t timestamp) {
    this->timestamp = timestamp;
}

void NetworkLog::setBody(std::string body) {
    this->body = body;
}

void NetworkLog::setHeaders(std::unordered_map<std::string, std::string> headers) {
    this->headers = headers;
}

void NetworkLog::setStatusCode(int status_code) {
    this->status_code = status_code;
}

std::string NetworkLog::toJson() {
    Object obj;
    obj.set("network_traffic_id", this->network_traffic_id);
    obj.set("method", this->method);
    obj.set("path", this->path);
    obj.set("timestamp", this->timestamp);
    obj.set("body", this->body);

    nlohmann::json j_headers(this->headers);
    obj.set("headers", j_headers.dump());

    obj.set("status_code", this->status_code);

    std::stringstream jsonStream;
    obj.stringify(jsonStream);
    return jsonStream.str();
}