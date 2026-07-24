'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const ManageProposals = () => {
    const [proposals, setProposals] = useState([]);
    const [loading, setLoading] = useState(true);
    const { data: session } = authClient.useSession();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    const fetchProposals = async () => {
        if (!session?.user?.email) return;
        try {
            const res = await axios.get(`${baseUrl}/api/client/proposals?clientEmail=${session.user.email}`);
            if (res.data.data) {
                setProposals(res.data.data);
            }
        } catch (error) {
            console.error("Error fetching proposals:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProposals();
    }, [session?.user?.email]);

    const handleAccept = async (proposal) => {
        try {
            toast.loading("Initiating Stripe Checkout...");
            const res = await axios.post(`${baseUrl}/api/stripe/create-checkout-session`, {
                proposalId: proposal._id,
                taskId: proposal.task_id || proposal.taskId,
                proposedBudget: proposal.proposed_budget || proposal.proposedBudget,
                taskTitle: proposal.task_title || proposal.taskTitle || "SkillSwap Micro-Task",
                clientEmail: session?.user?.email,
                freelancerEmail: proposal.freelancer_email || proposal.freelancerEmail
            });

            if (res.data.url) {
                window.location.href = res.data.url;
            } else {
                toast.dismiss();
                toast.error("Failed to create Stripe Checkout session.");
            }
        } catch (err) {
            console.error(err);
            toast.dismiss();
            toast.error("Payment initiation failed.");
        }
    };

    const handleReject = async (proposalId) => {
        try {
            const res = await axios.put(`${baseUrl}/api/proposals/${proposalId}/reject`);
            if (res.data.success) {
                toast.success("Proposal rejected.");
                fetchProposals();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to reject proposal.");
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading proposals...</div>;

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Manage Proposals</h1>
            <p className="text-gray-500 text-sm mb-8">Review proposals submitted by freelancers for your posted tasks</p>

            {proposals.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500">
                    No proposals received yet.
                </div>
            ) : (
                proposals.map((p) => (
                    <div key={p._id} className="p-6 border border-gray-100 rounded-2xl shadow-sm mb-6 bg-white hover:shadow-md transition">
                        <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-2">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">{p.task_title || p.taskTitle || "Micro Task"}</h2>
                                <p className="text-xs text-gray-500 mt-1">From: <strong className="text-gray-700">{p.freelancer_email || p.freelancerEmail}</strong></p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className={`px-3 py-1 rounded-md text-xs font-bold ${
                                    p.status === 'Accepted' ? 'bg-emerald-50 text-emerald-700' :
                                    p.status === 'Rejected' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'
                                }`}>
                                    {p.status || "Pending"}
                                </span>

                                {(p.status === 'pending' || p.status === 'Pending' || !p.status) && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleAccept(p)}
                                            className="px-4 py-2 bg-cyan-600 text-white font-medium text-xs rounded-xl hover:bg-cyan-700 transition"
                                        >
                                            ✓ Accept & Pay via Stripe
                                        </button>
                                        <button
                                            onClick={() => handleReject(p._id)}
                                            className="px-3 py-2 bg-rose-50 text-rose-600 font-medium text-xs rounded-xl hover:bg-rose-100 transition"
                                        >
                                            × Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-600 text-xs mb-4 bg-gray-50 p-3 rounded-xl">{p.cover_note || p.coverNote}</p>

                        <div className="flex gap-6 text-xs text-gray-500">
                            <span>Proposed Budget: <strong className="text-emerald-600 font-bold">${p.proposed_budget || p.proposedBudget} USD</strong></span>
                            <span>Estimated Days: <strong>{p.estimated_days || p.estimatedDays} days</strong></span>
                            <span>Date Sent: <strong>{p.submitted_at ? new Date(p.submitted_at).toLocaleDateString() : 'Recent'}</strong></span>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ManageProposals;
