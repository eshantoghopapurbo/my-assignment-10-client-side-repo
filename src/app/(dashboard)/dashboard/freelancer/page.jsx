"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, CircleCheck, CircleDollar, Briefcase } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import axios from "axios";

export default function FreelancerDashboard() {
    const { data: session } = authClient.useSession();
    const [proposals, setProposals] = useState([]);
    const [earnings, setEarnings] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        if (!session?.user?.email) return;
        const loadStats = async () => {
            try {
                const [pRes, eRes] = await Promise.all([
                    axios.get(`${baseUrl}/my-proposals?freelancerEmail=${session.user.email}`),
                    axios.get(`${baseUrl}/api/freelancer/earnings?freelancerEmail=${session.user.email}`)
                ]);
                if (Array.isArray(pRes.data)) setProposals(pRes.data);
                if (eRes.data.payments) setEarnings(eRes.data.payments);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, [session?.user?.email]);

    const totalProposals = proposals.length;
    const pendingProposals = proposals.filter(p => (p.status || 'Pending').toLowerCase() === 'pending').length;
    const acceptedProposals = proposals.filter(p => (p.status || '').toLowerCase() === 'accepted').length;
    const totalEarnings = earnings.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    const STATS = [
        { title: "Total Proposals", value: `${totalProposals}`, description: "Proposals submitted", icon: FileText },
        { title: "Pending Proposals", value: `${pendingProposals}`, description: "Awaiting response", icon: Briefcase },
        { title: "Accepted Proposals", value: `${acceptedProposals}`, description: "Active or ready for payout", icon: Clock },
        { title: "Total Earnings (USD)", value: `$${totalEarnings}`, description: "From completed tasks", icon: CircleDollar },
    ];

    return (
        <div className="container mx-auto bg-gray-50 p-4 md:p-8 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Freelancer Dashboard</h1>
                    <p className="text-gray-500 mt-1 text-sm">Track your proposals, active tasks, and earnings</p>
                </div>
                <Link href="/tasks">
                    <Button className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl px-6 w-full sm:w-auto text-sm">
                        Browse Open Tasks
                    </Button>
                </Link>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {STATS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-xs font-semibold text-gray-500">{item.title}</p>
                                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">{item.value}</h2>
                                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                                </div>
                                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                                    <Icon width={24} height={24} className="text-cyan-700" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Proposals */}
            <div className="mt-8 md:mt-10">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-gray-900">My Sent Proposals</h2>
                    <Link href="/dashboard/freelancer/myproposals" className="text-xs font-semibold text-cyan-600 hover:underline">
                        View All &rarr;
                    </Link>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                    {proposals.length === 0 ? (
                        <div className="text-center py-10">
                            <h3 className="text-base font-bold text-gray-900">No proposals submitted yet</h3>
                            <p className="text-gray-500 text-xs mt-1">Browse open tasks and submit your first bid.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {proposals.slice(0, 5).map((p) => (
                                <div key={p._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-50 rounded-xl bg-gray-50/50 gap-2">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{p.task_title || "Micro Task"}</h4>
                                        <p className="text-xs text-gray-500 truncate max-w-md">{p.cover_note || p.coverNote}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-bold text-emerald-600">${p.proposed_budget || p.proposedBudget} USD</span>
                                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                            p.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                        }`}>{p.status || 'Pending'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}