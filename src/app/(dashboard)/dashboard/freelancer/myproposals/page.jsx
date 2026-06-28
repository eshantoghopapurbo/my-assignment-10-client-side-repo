"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; 
import { getMyProposals } from "@/lib/actions/actions";

export default function MyProposalsPage() {
    const [proposals, setProposals] = useState([]);
    const { data: session } = authClient.useSession();

    useEffect(() => {
    if (session?.user?.email) {
        getMyProposals(session.user.email).then((data) => {
            const sortedData = [...data].sort((a, b) => 
                new Date(b.createdAt) - new Date(a.createdAt)
            );
            setProposals(sortedData);
        });
    }
}, [session]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">My Proposals</h1>

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="w-full  text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className="px-6 py-3">cover Note</th>
                            <th className="px-6 py-3">Budget</th>
                            <th className="px-6 py-3">Date Sent</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {proposals.map((item) => (
                            <tr key={item._id} className="bg-white border-b hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{item.coverNote}</td>
                                <td className="px-6 py-4">${item.proposedBudget}</td>
                                <td className="px-6 py-4">{new Date(item.estimatedDays).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold 
                                        ${item.status === 'Accepted' ? 'text-green-600 bg-green-100' :
                                            item.status === 'Rejected' ? 'text-red-600 bg-red-100' : 'text-yellow-600 bg-yellow-100'}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}




