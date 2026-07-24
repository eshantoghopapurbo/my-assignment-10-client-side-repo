"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminManageUsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/admin/users`);
            if (res.data.users) {
                setUsers(res.data.users);
            }
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleToggleBlock = async (userId, currentBlockState) => {
        try {
            const res = await axios.put(`${baseUrl}/api/admin/users/${userId}/block`, {
                isBlocked: !currentBlockState
            });
            if (res.data.success) {
                toast.success(currentBlockState ? "User unblocked successfully" : "User blocked successfully");
                fetchUsers();
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to update user block status");
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading users...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Manage Users</h1>
            <p className="text-gray-500 text-sm mb-6">View, block, and unblock platform accounts</p>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="py-3 px-6">Name</th>
                                <th className="py-3 px-6">Email</th>
                                <th className="py-3 px-6">Role</th>
                                <th className="py-3 px-6">Status</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                            {users.map((u) => (
                                <tr key={u._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-bold text-gray-900">{u.name || "User"}</td>
                                    <td className="py-4 px-6">{u.email}</td>
                                    <td className="py-4 px-6 font-semibold uppercase text-cyan-700">{u.role || "client"}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                            u.isBlocked ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
                                        }`}>
                                            {u.isBlocked ? "Blocked" : "Active"}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => handleToggleBlock(u._id, u.isBlocked)}
                                            className={`px-3 py-1.5 rounded-xl font-semibold text-xs transition ${
                                                u.isBlocked
                                                    ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                                    : "bg-rose-50 text-rose-700 hover:bg-rose-100"
                                            }`}
                                        >
                                            {u.isBlocked ? "Unblock" : "Block"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}