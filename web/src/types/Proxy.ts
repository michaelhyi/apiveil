export default interface Proxy {
    proxyId: number;
    userId: number;
    name: string;
    status: string;
    cloudProvider: string;
    cloudRegion: string;
    pricingPlan: string;
    apiProtocol: string;
    apiBaseUrl: string;
    proxyUrl: string;
    ipAddress: string;
    serverId: string;
    createdAt: string;
    updatedAt: string;
}
