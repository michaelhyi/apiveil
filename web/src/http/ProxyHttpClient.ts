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
        cloudProviderRegion,
        pricingPlan,
        apiProtocol,
        baseApiUrl,
    }: {
        name: string;
        cloudProvider: string;
        cloudProviderRegion: string;
        pricingPlan: string;
        apiProtocol: string;
        baseApiUrl: string;
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
                cloudProviderRegion,
                pricingPlan,
                apiProtocol,
                baseApiUrl,
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
