"use client";

import ProtectedRoute from "@/components/Auth/ProtectedRoute";
import PricingHttpClient from "@/http/PricingHttpClient";
import getStripe from "@/utils/get-stripe";
import { useCallback } from "react";

export default function Pricing() {
    const handleClick = useCallback(async () => {
        try {
            const { sessionId } =
                await PricingHttpClient.subscribeToEnterprisePlan();
            const stripe = await getStripe();
            await stripe?.redirectToCheckout({ sessionId });
        } catch {}
    }, []);

    return (
        <ProtectedRoute>
            <button
                onClick={handleClick}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black bg-white rounded-md px-4 py-2 cursor-pointer duration-300 hover:opacity-50"
            >
                Subscribe to Enterprise Plan
            </button>
        </ProtectedRoute>
    );
}
