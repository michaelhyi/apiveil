import { ProxyLog as ProxyLogType } from "@/types/ProxyLog";
import Image from "next/image";
import { Dispatch, SetStateAction, useCallback, useState } from "react";

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

export default function ProxyLog({
    log,
    expanded,
    setExpanded,
}: {
    log: ProxyLogType;
    expanded: number;
    setExpanded: Dispatch<SetStateAction<number>>;
}) {
    const [selected, setSelected] = useState(0);

    const handleClick = useCallback(() => {
        if (expanded === log.proxyLogId) {
            setExpanded(-1);
        } else {
            setExpanded(log.proxyLogId);
        }
    }, [log.proxyLogId, expanded, setExpanded]);

    return (
        <div className="flex flex-col mt-4 ml-6">
            <div
                key={log.proxyLogId}
                className="flex items-center gap-3 text-sm cursor-pointer"
                onClick={handleClick}
            >
                {expanded === log.proxyLogId ? (
                    <Image
                        alt="collapse"
                        width={25}
                        height={25}
                        src="/assets/chevron-bottom.svg"
                    />
                ) : (
                    <Image
                        alt="expand"
                        width={25}
                        height={25}
                        src="/assets/chevron-right.svg"
                    />
                )}
                <p>{convertUnixToFormattedDate(log.timestamp)}</p>
                <p className="text-white">
                    {log.method}&nbsp;{log.path}
                </p>
                <p
                    className={`font-semibold px-2 rounded-md ${
                        log.statusCode >= 200 && log.statusCode < 300
                            ? "text-[#89DA9F] bg-[#143518]"
                            : log.statusCode >= 400 && log.statusCode <= 500
                              ? "text-[#EFA296] bg-[#521F0F]"
                              : "text-gray-500"
                    }`}
                >
                    {log.statusCode}
                </p>
            </div>
            {expanded === log.proxyLogId && (
                <div className="mb-8">
                    <div className="flex items-center justify-between text-sm mt-4 gap-4 ml-10 w-1/3">
                        <p
                            className={`cursor-pointer ${selected === 0 ? "underline font-semibold" : "font-normal"}`}
                            onClick={() => setSelected(0)}
                        >
                            Request Body
                        </p>
                        <p
                            className={`cursor-pointer ${selected === 1 ? "underline font-semibold" : "font-normal"}`}
                            onClick={() => setSelected(1)}
                        >
                            Request Headers
                        </p>
                        <p
                            className={`cursor-pointer ${selected === 2 ? "underline font-semibold" : "font-normal"}`}
                            onClick={() => setSelected(2)}
                        >
                            Response Body
                        </p>
                        <p
                            className={`cursor-pointer ${selected === 3 ? "underline font-semibold" : "font-normal"}`}
                            onClick={() => setSelected(3)}
                        >
                            Response Headers
                        </p>
                    </div>
                    <pre className="bg-[#212121] text-white w-1/3 text-sm p-4 rounded-lg overflow-auto whitespace-pre-wrap break-words mt-4 ml-10">
                        {(() => {
                            const raw =
                                selected === 0
                                    ? log.requestBody
                                    : selected === 1
                                      ? log.requestHeaders
                                      : selected === 2
                                        ? log.responseBody
                                        : selected === 3
                                          ? log.responseHeaders
                                          : null;

                            try {
                                const parsed =
                                    typeof raw === "string"
                                        ? JSON.parse(raw)
                                        : raw;
                                return JSON.stringify(parsed, null, 2);
                            } catch {
                                return raw ?? "N/A"; // fallback for non-JSON or null
                            }
                        })()}
                    </pre>
                </div>
            )}
        </div>
    );
}
