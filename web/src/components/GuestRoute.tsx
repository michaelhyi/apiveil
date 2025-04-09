"use client";

import AuthHttpClient from "@/http/AuthHttpClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function GuestRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                await AuthHttpClient.getMe();
                router.push("/dashboard");
            } catch {
                setLoading(false);
            }
        })();
    }, [router, setLoading]);

    if (loading) {
        return (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">
                loading...
            </div>
        );
    }

    return children;
}
