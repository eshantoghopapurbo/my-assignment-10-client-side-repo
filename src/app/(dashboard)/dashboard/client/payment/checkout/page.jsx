"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/dashboard/client/proposals");
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <p className="text-slate-500 font-medium">Redirecting to Proposals...</p>
        </div>
    );
}