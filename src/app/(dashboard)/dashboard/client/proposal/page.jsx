'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const ManageProposals = () => {
    const router = useRouter();
    const handleAccept = (proposal) => {
        const query = new URLSearchParams({
            taskId: proposal.taskId,      // আপনার ডাটাবেস অনুযায়ী taskId
            proposalId: proposal._id,    // প্রপোজাল আইডি
            amount: proposal.proposedBudget,
            freelancerEmail: proposal.freelancerEmail
        }).toString();

        router.push(`/dashboard/client/payment/checkout?${query}`);
    };
    const [proposals, setProposals] = useState([]);
    const { data: session } = authClient.useSession();
    console.log("session data in manage proposals", session);

    useEffect(() => {
        fetchProposals();
    }, []);

    const fetchProposals = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/proposals");
            const sortedProposals = res.data.data.sort((a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setProposals(sortedProposals);
        } catch (error) {
            console.error("Error fetching proposals:", error);
        }
    };
    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/proposals/${id}`, { status });
            fetchProposals(); // রিফ্রেশ ডাটা
        } catch (error) {
            alert("Failed to update status");
        }
    };
    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-2">Manage Proposals</h1>
            <p className="text-gray-500 mb-8">Review and respond to freelancer proposals</p>
            {proposals.map((p) => (
                <div key={p._id} className="p-6 border border-gray-100 rounded-xl shadow-sm mb-6 bg-white hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-lg font-bold">{p.taskTitle || "Task Title"}</h2>
                            <span
                                onClick={() => handleAccept(p)}
                                className={`px-2 py-0.5 rounded text-xs font-medium ${p.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : p.status === 'Accepted' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {p.status}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">from {p.freelancerEmail}</p>
                        </div>
                        {p.status === 'Pending' && (
                            <div className="flex gap-2">
                                {/* পেমেন্ট পেজে রিডাইরেক্ট করার জন্য এখানে handleAccept কল করা হচ্ছে */}
                                <button
                                    onClick={() => handleAccept(p)}
                                    className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                                >
                                    ✓ Accept
                                </button>

                                {/* রিজেক্ট বাটন আগের মতোই থাকবে */}
                                <button
                                    onClick={() => handleStatusChange(p._id, 'Rejected')}
                                    className="px-4 py-1.5 bg-red-100 text-red-600 text-sm rounded-lg hover:bg-red-200"
                                >
                                    × Reject
                                </button>
                            </div>
                        )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{p.coverNote}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <span>$ Bid: <span className="font-semibold text-orange-500">${p.proposedBudget}</span></span>
                        <span>🕒 {p.estimatedDays} days</span>
                        <span>📅 {new Date(p.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ManageProposals;
