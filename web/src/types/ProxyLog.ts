export interface ProxyLog {
    proxyLogId: number;
    proxyId: number;
    timestamp: string;
    method: string;
    path: string;
    statusCode: number;
    requestHeaders: string;
    responseHeaders: string;
    requestBody: string;
    responseBody: string;
}
