export default class PricingHttpClient {
    static async subscribeToEnterprisePlan() {
        const response = await fetch(
            "http://localhost:8080/api/v1/pricing/subscribe/enterprise",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            },
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error);
        }

        return data;
    }
}
