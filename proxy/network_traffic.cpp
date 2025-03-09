#include <Poco/JSON/Object.h>

#include "network_traffic.h"
#include "../include/nlohmann/json.hpp"

using namespace Poco::JSON;

NetworkTraffic::NetworkTraffic(std::string network_traffic_id, std::string method, std::string path, time_t timestamp, std::string body, std::unordered_map<std::string, std::string> headers, int status_code)
{
    this->network_traffic_id = network_traffic_id;
    this->method = method;
    this->path = path;
    this->timestamp = timestamp;
    this->body = body;
    this->headers = headers;
    this->status_code = status_code;
}

NetworkTraffic::NetworkTraffic(std::string method, std::string path, std::string body, std::unordered_map<std::string, std::string> headers, int status_code)
{
    this->method = method;
    this->path = path;
    this->timestamp = time(nullptr);
    this->body = body;
    this->headers = headers;
    this->status_code = status_code;
}

std::string NetworkTraffic::getNetworkTrafficId() {
    return this->network_traffic_id;
}

std::string NetworkTraffic::getMethod() {
    return this->method;
}

std::string NetworkTraffic::getPath() {
    return this->path;
}

time_t NetworkTraffic::getTimestamp() {
    return this->timestamp;
}

std::string NetworkTraffic::getBody() {
    return this->body;
}

std::unordered_map<std::string, std::string> NetworkTraffic::getHeaders() {
    return this->headers;
}

int NetworkTraffic::getStatusCode() {
    return this->status_code;
}

void NetworkTraffic::setNetworkTrafficId(std::string network_traffic_id) {
    this->network_traffic_id = network_traffic_id;
}

void NetworkTraffic::setMethod(std::string method) {
    this->method = method;
}

void NetworkTraffic::setPath(std::string path) {
    this->path = path;
}

void NetworkTraffic::setTimestamp(time_t timestamp) {
    this->timestamp = timestamp;
}

void NetworkTraffic::setBody(std::string body) {
    this->body = body;
}

void NetworkTraffic::setHeaders(std::unordered_map<std::string, std::string> headers) {
    this->headers = headers;
}

void NetworkTraffic::setStatusCode(int status_code) {
    this->status_code = status_code;
}

std::string NetworkTraffic::toJson() {
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