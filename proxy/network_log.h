#include <string>
#include <ctime>
#include <map>

#ifndef NETWORK_LOG_H
#define NETWORK_LOG_H

class NetworkLog {
private:
    std::string network_traffic_id;
    std::string method;
    std::string path;
    time_t timestamp;
    std::string body;
    std::unordered_map<std::string, std::string> headers;
    int status_code;

public:
    NetworkLog(std::string network_traffic_id, std::string method, std::string path, time_t timestamp, std::string body, std::unordered_map<std::string, std::string> headers, int status_code);
    NetworkLog(std::string method, std::string path, std::string body, std::unordered_map<std::string, std::string> headers, int status_code);

    std::string getNetworkTrafficId();
    std::string getMethod();
    std::string getPath();
    time_t getTimestamp();
    std::string getBody();
    std::unordered_map<std::string, std::string> getHeaders();
    int getStatusCode();

    void setNetworkTrafficId(std::string network_traffic_id);
    void setMethod(std::string method);
    void setPath(std::string path);
    void setTimestamp(time_t timestamp);
    void setBody(std::string body);
    void setHeaders(std::unordered_map<std::string, std::string> headers);
    void setStatusCode(int status_code);

    std::string toString();
    std::string toJson();
    static NetworkLog fromJson(std::string json);
};

#endif