"use client";

import Loading from "@/components/Loading";
import ProtectedRoute from "@/components/ProtectedRoute";
import ProxyHttpClient from "@/http/ProxyHttpClient";
import { ProxyWithLogs } from "@/types/ProxyWithLogs";
import Link from "next/link";
import { useEffect, useState } from "react";

function convertUnixToFormattedDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}

export default function ProxyPage({ params }: { params: { proxyId: string } }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<ProxyWithLogs | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { proxyId } = await params;
                const { proxy: proxyWithLogs } =
                    await ProxyHttpClient.getProxyWithLogsByProxyId(proxyId);
                setData(proxyWithLogs);
                console.log(proxyWithLogs);
            } catch {
            } finally {
                setLoading(false);
            }
        })();
    }, [params]);

    if (loading) {
        return <Loading />;
    }

    return (
        data && (
            <ProtectedRoute>
                <main className="px-20 py-18 flex flex-col">
                    <Link className="text-[#939393] text-sm" href="/dashboard">
                        &larr;&nbsp;&nbsp;Back to Home
                    </Link>
                    <h1 className="mt-3 mb-5 font-bold text-4xl">
                        {data.name}
                    </h1>

                    <div className="mt-2 text-sm flex gap-16">
                        <p>
                            <span className="font-medium">Cloud Provider:</span>
                            &nbsp;
                            <span className="text-[#A5A2A2]">
                                {data.cloudProvider}
                            </span>
                        </p>
                        <p>
                            <span className="font-medium">
                                Cloud Provider Region:
                            </span>
                            &nbsp;
                            <span className="text-[#A5A2A2]">
                                {data.cloudRegion}
                            </span>
                        </p>
                        <p>
                            <span className="font-medium">Pricing Plan:</span>
                            &nbsp;
                            <span className="text-[#A5A2A2]">
                                {data.pricingPlan}
                            </span>
                        </p>
                        <p>
                            <span className="font-medium">API Protocol:</span>
                            &nbsp;
                            <span className="text-[#A5A2A2]">
                                {data.apiProtocol}
                            </span>
                        </p>
                    </div>
                    <div className="mt-2 text-sm flex gap-16">
                        <p>
                            <span className="font-medium">Proxy URL:</span>
                            &nbsp;
                            <span className="text-[#A5A2A2]">
                                https://0bd62e53-cf86-4734-ab94-4eb4dd62c974.apiveil.com/
                            </span>
                        </p>
                        <p>
                            <span className="font-medium">Base API URL:</span>
                            &nbsp;
                            <span className="text-[#A5A2A2]">
                                https://infra-api-gateway-3b3fe1b4-9ae7.company.com/
                            </span>
                        </p>
                    </div>

                    <div
                        id="logs"
                        className="mt-18 border border-[#A2A5A5] rounded-lg h-128 overflow-y-auto p-3"
                    >
                        {data.logs.map((log) => (
                            <div
                                key={log.proxyLogId}
                                className="flex items-center gap-3 text-sm mt-4 ml-6"
                            >
                                <p>&rsaquo;</p>
                                <p>
                                    {convertUnixToFormattedDate(log.timestamp)}
                                </p>
                                <p className="text-white">
                                    {log.method}&nbsp;{log.path}
                                </p>
                                <p
                                    className={`font-semibold px-2 rounded-md ${
                                        log.statusCode >= 200 &&
                                        log.statusCode < 300
                                            ? "text-[#89DA9F] bg-[#143518]"
                                            : log.statusCode >= 400 &&
                                                log.statusCode <= 500
                                              ? "text-[#EFA296] bg-[#521F0F]"
                                              : "text-gray-500"
                                    }`}
                                >
                                    {log.statusCode}
                                </p>
                            </div>
                        ))}
                    </div>
                </main>
            </ProtectedRoute>
        )
    );
}
