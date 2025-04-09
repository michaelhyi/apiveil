export default class ProxyLogHttpClient {
    static async analyzeProxyLog(proxyLogId: string) {
        const response = await fetch(
            `http://localhost:8080/api/v1/proxies/${proxyLogId}/analyze`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                credentials: "include",
            },
        );

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error);
        }
    }
}
