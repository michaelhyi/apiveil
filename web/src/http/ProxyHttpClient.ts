export default class ProxyHttpClient {
    static async getAllProxiesByUserId(userId: string) {
        const response = await fetch(
            `http://localhost:8080/api/v1/proxies/${userId}`,
            {
                method: "GET",
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

    static async createProxy({
        name,
        cloudProvider,
        cloudRegion,
        pricingPlan,
        apiProtocol,
        apiBaseUrl,
    }: {
        name: string;
        cloudProvider: string;
        cloudRegion: string;
        pricingPlan: string;
        apiProtocol: string;
        apiBaseUrl: string;
    }) {
        const response = await fetch("http://localhost:8080/api/v1/proxies", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                name,
                cloudProvider,
                cloudRegion,
                pricingPlan,
                apiProtocol,
                apiBaseUrl,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            return data;
        } else {
            throw new Error(data.error);
        }
    }
}
