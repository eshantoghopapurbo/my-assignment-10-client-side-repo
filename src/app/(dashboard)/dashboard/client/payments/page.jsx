"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PaymentsPage() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        axios
            .get(`${baseUrl}/api/payment`)
            .then((res) => {
                if (Array.isArray(res.data)) {
                    setPayments(res.data);
                } else if (res.data.success && Array.isArray(res.data.data)) {
                    setPayments(res.data.data);
                }
            })
            .catch((err) => console.error("Payment fetch error:", err))
            .finally(() => setLoading(false));
    }, [baseUrl]);

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl font-extrabold text-slate-800 mb-6">Payment History</h1>
            {loading ? (
                <div className="text-slate-500">Loading payment history...</div>
            ) : payments.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center text-slate-500 border border-slate-100">
                    No payment history found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {payments.map((item) => (
                        <div
                            key={item._id}
                            className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3"
                        >
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-lg">
                                    Payment
                                </span>
                                <span className="text-lg font-black text-slate-800">
                                    ${item.price || item.amount || 0}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">
                                <strong>Session:</strong> {item.sessionId || "N/A"}
                            </p>
                            <p className="text-xs text-slate-500 truncate">
                                <strong>User:</strong> {item.userEmail || item.clientEmail || "N/A"}
                            </p>
                            <p className="text-xs text-slate-400">
                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ""}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}