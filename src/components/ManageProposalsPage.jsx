
"use client";

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { rejectProposalAction } from "@/lib/actions/actions";

const ManageProposalsPage = ({ taskId, proposals }) => {
    const [proposalList, setProposalList] = useState(proposals);
    const [isProcessing, setIsProcessing] = useState(false);
    const router = useRouter();

    // প্রপোজাল রিজেক্ট করার ফাংশন
    const handleReject = async (proposalId) => {
        if (!confirm("Are you sure you want to reject this proposal?")) return;

        setIsProcessing(true);
        const res = await rejectProposalAction(taskId, proposalId);

        if (res.success) {
            toast.success(res.message);
            // রিজেক্ট হওয়ার পর UI থেকে আপডেট করা
            setProposalList(prev => prev.filter(p => p.proposalId !== proposalId));
            router.refresh();
        } else {
            toast.error(res.message);
        }
        setIsProcessing(false);
    };

    // প্রপোজাল একসেপ্ট করার ফাংশন (পেমেন্ট ফ্লো)
    const handleAccept = (proposalId) => {
        // সরাসরি পেমেন্ট পেজে পাঠিয়ে দেওয়া
        router.push(`/payment/checkout?taskId=${taskId}&proposalId=${proposalId}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Manage Proposals</h1>
            <div className="space-y-4">
                {proposalList.map((proposal) => (
                    <div key={proposal.proposalId} className="p-4 border rounded-xl flex justify-between items-center bg-white shadow-sm">
                        <div>
                            <h3 className="font-bold">{proposal.freelancerEmail}</h3>
                            <p className="text-sm text-gray-500">Budget: ${proposal.proposedBudget} | Days: {proposal.estimatedDays}</p>
                        </div>

                        {proposal.status === "Pending" ? (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAccept(proposal.proposalId)}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleReject(proposal.proposalId)}
                                    disabled={isProcessing}
                                    className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                >
                                    {isProcessing ? "Processing..." : "Reject"}
                                </button>
                            </div>
                        ) : (
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${proposal.status === 'Accepted' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {proposal.status}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProposalsPage;