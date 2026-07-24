"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";

export default function AdminTransactionsPage() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/admin/transactions`);
                if (res.data.transactions) {
                    setTransactions(res.data.transactions);
                }
            } catch (err) {
                console.error("Error fetching transactions:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    if (loading) return <div className="p-10 text-center text-gray-500">Loading transactions...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Transactions History</h1>
            <p className="text-gray-500 text-sm mb-6">Complete log of all processed Stripe checkout payments</p>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="py-3 px-6">Client Email</th>
                                <th className="py-3 px-6">Freelancer Email</th>
                                <th className="py-3 px-6">Payout Size</th>
                                <th className="py-3 px-6">Payment Date</th>
                                <th className="py-3 px-6">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                            {transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-gray-500">No payment transactions recorded yet.</td>
                                </tr>
                            ) : (
                                transactions.map((t, idx) => (
                                    <tr key={t._id || idx} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 font-semibold">{t.client_email || t.userEmail || "Client"}</td>
                                        <td className="py-4 px-6">{t.freelancer_email || "Freelancer"}</td>
                                        <td className="py-4 px-6 font-bold text-emerald-600">${t.amount} USD</td>
                                        <td className="py-4 px-6">{t.paid_at ? new Date(t.paid_at).toLocaleDateString() : 'Recent'}</td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-semibold text-[11px]">
                                                <CheckCircle2 size={12} /> {t.payment_status || "succeeded"}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
