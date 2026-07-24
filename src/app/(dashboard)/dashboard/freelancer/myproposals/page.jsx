"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import axios from "axios";

export default function MyProposalsPage() {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        if (session?.user?.email) {
            axios.get(`${baseUrl}/my-proposals?freelancerEmail=${session.user.email}`)
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        setProposals(res.data);
                    }
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }, [session?.user?.email]);

    if (loading) return <div className="p-10 text-center text-gray-500">Loading proposals...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">My Proposals</h1>
            <p className="text-gray-500 text-sm mb-6">Track status of all submitted task proposals</p>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                {proposals.length === 0 ? (
                    <div className="p-12 text-center text-gray-500 text-sm">No proposals submitted yet.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-6">Task Title</th>
                                    <th className="py-3 px-6">Proposed Budget</th>
                                    <th className="py-3 px-6">Est. Days</th>
                                    <th className="py-3 px-6">Cover Note</th>
                                    <th className="py-3 px-6">Submitted Date</th>
                                    <th className="py-3 px-6">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                                {proposals.map((item) => (
                                    <tr key={item._id} className="hover:bg-gray-50">
                                        <td className="py-4 px-6 font-bold text-gray-900">{item.task_title || "Micro Task"}</td>
                                        <td className="py-4 px-6 font-semibold text-emerald-600">${item.proposed_budget || item.proposedBudget} USD</td>
                                        <td className="py-4 px-6">{item.estimated_days || item.estimatedDays} days</td>
                                        <td className="py-4 px-6 max-w-xs truncate">{item.cover_note || item.coverNote}</td>
                                        <td className="py-4 px-6">
                                            {item.submitted_at ? new Date(item.submitted_at).toLocaleDateString() : "Recent"}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold capitalize ${
                                                item.status === 'Accepted' ? 'text-emerald-700 bg-emerald-50' :
                                                item.status === 'Rejected' ? 'text-rose-700 bg-rose-50' : 'text-amber-700 bg-amber-50'
                                            }`}>
                                                {item.status || "Pending"}
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
