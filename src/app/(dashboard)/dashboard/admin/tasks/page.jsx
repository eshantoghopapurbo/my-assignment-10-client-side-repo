"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AdminManageTasksPage() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    const fetchTasks = async () => {
        try {
            const res = await axios.get(`${baseUrl}/task?limit=100`);
            if (res.data.tasks) {
                setTasks(res.data.tasks);
            } else if (Array.isArray(res.data)) {
                setTasks(res.data);
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            const res = await axios.delete(`${baseUrl}/api/tasks/${id}`);
            if (res.data.success) {
                toast.success("Task deleted successfully");
                fetchTasks();
            } else {
                toast.error(res.data.message || "Failed to delete task");
            }
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to delete task");
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading tasks...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Manage Tasks</h1>
            <p className="text-gray-500 text-sm mb-6">Review all platform task listings and delete non-compliant posts</p>

            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th className="py-3 px-6">Task Title</th>
                                <th className="py-3 px-6">Category</th>
                                <th className="py-3 px-6">Client Email</th>
                                <th className="py-3 px-6">Budget</th>
                                <th className="py-3 px-6">Status</th>
                                <th className="py-3 px-6">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
                            {tasks.map((t) => (
                                <tr key={t._id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 font-bold text-gray-900 max-w-xs truncate">{t.title}</td>
                                    <td className="py-4 px-6">{t.category}</td>
                                    <td className="py-4 px-6">{t.client_email}</td>
                                    <td className="py-4 px-6 font-bold text-emerald-600">${t.budget} USD</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                                            t.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                                        }`}>
                                            {t.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button
                                            onClick={() => handleDelete(t._id)}
                                            className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl font-semibold text-xs transition"
                                        >
                                            Delete Task
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
