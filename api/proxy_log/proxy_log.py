import datetime

class ProxyLog:
    def __init__(
        self,
        proxy_log_id: int,
        proxy_id: int,
        timestamp: datetime.datetime,
        method: str,
        path: str,
        status_code: int,
        request_headers: str,
        response_headers: str,
        request_body: str,
        response_body: str,
    ):
        self.proxy_log_id = proxy_log_id
        self.proxy_id = proxy_id
        self.timestamp = timestamp
        self.method = method
        self.path = path
        self.status_code = status_code
        self.request_headers = request_headers
        self.response_headers = response_headers
        self.request_body = request_body
        self.response_body = response_body

    def to_dict(self) -> dict:
        return {
            "proxy_log_id": self.proxy_log_id,
            "proxy_id": self.proxy_id,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
            "method": self.method,
            "path": self.path,
            "status_code": self.status_code,
            "request_headers": self.request_headers,
            "response_headers": self.response_headers,
            "request_body": self.request_body,
            "response_body": self.response_body,
        }