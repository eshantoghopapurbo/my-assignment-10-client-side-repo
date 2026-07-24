"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import { DollarSign, CheckCircle2 } from "lucide-react";

export default function FreelancerEarningsPage() {
    const { data: session } = authClient.useSession();
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchEarnings = async () => {
            if (!session?.user?.email) return;
            try {
                const res = await axios.get(`${baseUrl}/api/freelancer/earnings?freelancerEmail=${session.user.email}`);
                if (res.data.payments) {
                    setPayments(res.data.payments);
                }
            } catch (err) {
                console.error("Error fetching earnings:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchEarnings();
    }, [session?.user?.email]);

    const totalEarnings = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

    if (loading) return <div className="p-10 text-center text-gray-500">Loading earnings...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">My Earnings</h1>
            <p className="text-gray-500 text-sm mb-6">Summary of completed tasks and payments received via Stripe</p>

            <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-8 max-w-sm shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <DollarSign size={24} />
                </div>
                <div>
                    <p className="text-xs text-gray-500 font-medium">Total Earned</p>
                    <h2 className="text-2xl font-extrabold text-gray-900">${totalEarnings} USD</h2>
                </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Payment Breakdown</h3>
                </div>

                {payments.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 text-sm">No payment records found yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-6">Transaction ID</th>
                                    <th className="py-3 px-6">Client Email</th>
                                    <th className="py-3 px-6">Amount</th>
                                    <th className="py-3 px-6">Payment Date</th>
                                    <th className="py-3 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                                {payments.map((p, idx) => (
                                    <tr key={p._id || idx} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 font-mono">{p.transaction_id || p.sessionId || 'N/A'}</td>
                                        <td className="py-4 px-6">{p.client_email || p.userEmail || 'Client'}</td>
                                        <td className="py-4 px-6 font-bold text-emerald-600">${p.amount} USD</td>
                                        <td className="py-4 px-6">{p.paid_at ? new Date(p.paid_at).toLocaleDateString() : 'Recent'}</td>
                                        <td className="py-4 px-6">
                                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-semibold text-[11px]">
                                                <CheckCircle2 size={12} /> Paid
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
