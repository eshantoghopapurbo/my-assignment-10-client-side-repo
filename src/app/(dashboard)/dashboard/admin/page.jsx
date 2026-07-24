"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Users, FileText, DollarSign, Activity } from "lucide-react";

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalTasks: 0,
        activeTasks: 0,
        totalRevenue: 0
    });
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/admin/stats`);
                if (res.data.stats) {
                    setStats(res.data.stats);
                }
            } catch (err) {
                console.error("Error fetching admin stats:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const CARDS = [
        { title: "Total Users", value: `${stats.totalUsers}`, desc: "Registered clients & freelancers", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Total Tasks", value: `${stats.totalTasks}`, desc: "All posted micro-tasks", icon: FileText, color: "text-cyan-600", bg: "bg-cyan-50" },
        { title: "Active Tasks", value: `${stats.activeTasks}`, desc: "Currently in progress", icon: Activity, color: "text-amber-600", bg: "bg-amber-50" },
        { title: "Total Revenue (USD)", value: `$${stats.totalRevenue}`, desc: "Processed via Stripe Checkout", icon: DollarSign, color: "text-emerald-600", bg: "bg-emerald-50" },
    ];

    if (loading) return <div className="p-10 text-center text-gray-500">Loading admin stats...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8 min-h-screen">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mb-8">System metrics and platform activity overview</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {CARDS.map((card, idx) => {
                    const Icon = card.icon;
                    return (
                        <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-semibold text-gray-500">{card.title}</span>
                                <div className={`w-10 h-10 rounded-xl ${card.bg} ${card.color} flex items-center justify-center`}>
                                    <Icon size={20} />
                                </div>
                            </div>
                            <h2 className="text-3xl font-extrabold text-gray-900">{card.value}</h2>
                            <p className="text-xs text-gray-400 mt-1">{card.desc}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}