import { useRouter } from "next/navigation";
import { useCallback } from "react";

interface ProxyTableRowProps {
    proxyId: number;
    name: string;
    status: string;
    cloudProvider: string;
    cloudRegion: string;
    pricing: string;
    proxyUrl: string;
    baseApiUrl: string;
    apiProtocol: string;
}

export default function ProxyTableRow({
    proxyId,
    name,
    status,
    cloudProvider,
    cloudRegion,
    pricing,
    proxyUrl,
    baseApiUrl,
    apiProtocol,
}: ProxyTableRowProps) {
    const router = useRouter();

    const handleClick = useCallback(() => {
        router.push(`/proxy/${proxyId}`);
    }, [proxyId, router]);

    return (
        <tr onClick={handleClick} className="cursor-pointer">
            <td className="px-8 py-6">{name}</td>
            <td className="px-8 py-6">
                {status === "Running"
                    ? "🟢 Running"
                    : status === "Paused"
                      ? "🟡 Paused"
                      : "🔴 Terminated"}
            </td>
            <td className="px-8 py-6">{cloudProvider}</td>
            <td className="px-8 py-6">{cloudRegion}</td>
            <td className="px-8 py-6">{pricing}</td>
            <td className="px-8 py-6">{proxyUrl}</td>
            <td className="px-8 py-6">{baseApiUrl}</td>
            <td className="px-8 py-6">{apiProtocol}</td>
        </tr>
    );
}
