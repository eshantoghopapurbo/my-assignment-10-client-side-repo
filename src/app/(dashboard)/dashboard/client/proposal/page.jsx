"use client";

import React, { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import SecureCheckoutView from "@/components/SecureCheckoutView";
import RejectTaskModal from "@/components/RejectTaskModal";
import { getMyTasks } from "@/lib/actions/tasks";
import { Loader2 } from "lucide-react";

const ManageProposalsPage = () => {
    const { data: session } = authClient.useSession();
    const email = session?.user?.email || null;
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("All");

    const [showRejectModal, setShowRejectModal] = useState(false);
    const [selectedRejectData, setSelectedRejectData] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [selectedProposalData, setSelectedProposalData] = useState(null);

    // ডেটা ফেচিং
    useEffect(() => {
        const fetchTasks = async () => {
            if (!email) {
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const data = await getMyTasks(email);
                // যদি এপিআই রেসপন্স ঠিকঠাক আসে, তবে স্টেট আপডেট হবে
                setTasks(Array.isArray(data) ? data : []);
                console.log("API থেকে পাওয়া ডেটা:", data);
            } catch (error) {
                toast.error("Failed to load tasks");
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, [email]);

    // প্রপোজাল প্রসেসিং লজিক (আপনার দেওয়া ডেটা স্ট্রাকচার অনুযায়ী)
    const allProposals = tasks
        .filter((task) => task.proposals && task.proposals.length > 0)
        .flatMap((task) =>
            task.proposals.map((proposal) => ({
                ...proposal,
                taskTitle: task.title,
                taskId: task._id,
                taskStatus: task.status, // এটি টাস্কের স্ট্যাটাস (যেমন: 'open')
            }))
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // ফিল্টার লজিক
    const filteredProposals = allProposals.filter((prop) => {
        if (filterStatus === "All") return true;
        // prop.status মানে প্রপোজাল স্ট্যাটাস (Pending/Accepted/Rejected)
        return prop.status === filterStatus;
    });

    if (loading) {
        return (
            <div className="flex h-96 items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
            </div>
        );
    }

    // পেমেন্ট গেটওয়ে ভিউ
    if (showCheckout && selectedProposalData) {
        return (
            <SecureCheckoutView
                proposal={selectedProposalData}
                onBack={() => setShowCheckout(false)}
                onPaymentSuccess={() => setShowCheckout(false)}
            />
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 mt-10 md:px-8 min-h-screen">
            <div className="relative mb-10 p-6 rounded-3xl bg-current/5 border border-current/10 shadow-xl">
                <h1 className="text-3xl font-extrabold">Manage Proposals</h1>
                <p className="text-sm opacity-60">Total Tasks: {tasks.length} | Total Proposals: {allProposals.length}</p>
            </div>

            {/* ফিল্টার ট্যাব */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {["All", "Pending", "Accepted", "Rejected"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-5 py-2 text-xs font-bold rounded-xl border transition ${filterStatus === status
                                ? "bg-cyan-500 text-zinc-950 border-cyan-500"
                                : "bg-current/5 border-current/10"
                            }`}
                    >
                        {status} ({status === "All" ? allProposals.length : allProposals.filter((p) => p.status === status).length})
                    </button>
                ))}
            </div>

            {/* কার্ড লিস্ট */}
            <div className="space-y-4">
                {filteredProposals.length === 0 ? (
                    <div className="text-center p-16 border border-dashed border-current/10 rounded-3xl opacity-50">
                        No proposals found for status: {filterStatus}
                    </div>
                ) : (
                    filteredProposals.map((proposal) => (
                        <div key={proposal.proposalId || proposal._id} className="border border-current/10 rounded-2xl p-6 bg-current/5 hover:border-cyan-500/30 transition">
                            <h2 className="font-extrabold text-lg">{proposal.taskTitle}</h2>
                            <p className="text-sm opacity-70 mt-2">{proposal.coverNote || "No cover note provided."}</p>

                            <div className="mt-4 flex justify-between items-center">
                                <span className={`text-xs font-bold px-3 py-1 rounded-lg ${proposal.status === "Accepted" ? "bg-emerald-500/10 text-emerald-500" :
                                        proposal.status === "Rejected" ? "bg-rose-500/10 text-rose-500" :
                                            "bg-cyan-500/10 text-cyan-500"
                                    }`}>
                                    {proposal.status || "Pending"}
                                </span>

                                {proposal.status === "Pending" && (
                                    <button
                                        onClick={() => {
                                            setSelectedProposalData(proposal);
                                            setShowCheckout(true);
                                        }}
                                        className="px-4 py-2 bg-cyan-500 text-zinc-950 text-xs font-bold rounded-xl hover:bg-cyan-400"
                                    >
                                        Accept Pitch
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ManageProposalsPage;














