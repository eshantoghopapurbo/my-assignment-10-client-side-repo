"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Star, Briefcase, MapPin, Calendar, ArrowLeft,
    Mail, CheckCircle, Clock, Zap
} from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const SKILL_COLORS = [
    "bg-sky-100 text-sky-700 border-sky-200",
    "bg-violet-100 text-violet-700 border-violet-200",
    "bg-emerald-100 text-emerald-700 border-emerald-200",
    "bg-orange-100 text-orange-700 border-orange-200",
    "bg-pink-100 text-pink-700 border-pink-200",
    "bg-cyan-100 text-cyan-700 border-cyan-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-amber-100 text-amber-700 border-amber-200",
];

function getInitials(name = "") {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getAvatarColor(name = "") {
    const colors = [
        "from-sky-400 to-blue-600",
        "from-violet-400 to-purple-600",
        "from-emerald-400 to-teal-600",
        "from-orange-400 to-amber-600",
        "from-pink-400 to-rose-600",
        "from-cyan-400 to-sky-600",
    ];
    return colors[name.charCodeAt(0) % colors.length];
}

export default function FreelancerDetailPage() {
    const { id } = useParams();
    const [freelancer, setFreelancer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFreelancer = async () => {
            try {
                const res = await fetch(`${baseUrl}/api/freelancers/${id}`);
                const data = await res.json();
                if (data.success) setFreelancer(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchFreelancer();
    }, [id]);

    // Loading skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="skeleton h-8 w-32 rounded-xl mb-10" />
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-6">
                        <div className="flex gap-6 items-start">
                            <div className="skeleton w-28 h-28 rounded-2xl" />
                            <div className="flex-1 space-y-3">
                                <div className="skeleton h-7 w-48 rounded" />
                                <div className="skeleton h-4 w-36 rounded" />
                                <div className="skeleton h-4 w-24 rounded" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                        <div className="skeleton h-4 w-full rounded mb-2" />
                        <div className="skeleton h-4 w-5/6 rounded mb-2" />
                        <div className="skeleton h-4 w-4/6 rounded" />
                    </div>
                </div>
            </div>
        );
    }

    // Not found
    if (!freelancer) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-slate-700 mb-2">Freelancer Not Found</h2>
                    <p className="text-slate-400 mb-6">This profile doesn't exist or has been removed.</p>
                    <Link href="/freelancers" className="gradient-bg text-white font-semibold px-6 py-3 rounded-2xl inline-flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-200">
                        <ArrowLeft size={16} /> Back to Freelancers
                    </Link>
                </div>
            </div>
        );
    }

    const stats = [
        { icon: <Briefcase size={18} />, label: "Jobs Done", value: freelancer.completedJobs || 0 },
        { icon: <Star size={18} />, label: "Rating", value: "5.0" },
        { icon: <Clock size={18} />, label: "Response", value: "< 1hr" },
        { icon: <CheckCircle size={18} />, label: "Success", value: "98%" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Back button */}
            <div className="max-w-5xl mx-auto px-6 pt-8 pb-4">
                <Link
                    href="/freelancers"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-sky-600 transition-colors"
                >
                    <ArrowLeft size={16} /> Back to Freelancers
                </Link>
            </div>

            <div className="max-w-5xl mx-auto px-6">
                {/* ─── Profile Hero Card ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden mb-6"
                >
                    {/* Top gradient bar */}
                    <div className="h-32 gradient-bg-animated relative">
                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)" }} />
                    </div>

                    <div className="px-6 sm:px-8 pb-8">
                        {/* Avatar – overlapping gradient bar */}
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12 relative z-10">
                            <div className="flex items-end gap-5">
                                {freelancer.image ? (
                                    <img
                                        src={freelancer.image}
                                        alt={freelancer.name}
                                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg flex-shrink-0 bg-white"
                                    />
                                ) : (
                                    <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${getAvatarColor(freelancer.name)} flex items-center justify-center text-white font-black text-2xl border-4 border-white shadow-lg flex-shrink-0`}>
                                        {getInitials(freelancer.name)}
                                    </div>
                                )}
                                <div className="pb-1">
                                    <h1 className="section-title text-2xl font-bold text-slate-900">{freelancer.name}</h1>
                                    <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5 font-medium">
                                        <Mail size={13} /> {freelancer.email}
                                    </p>
                                </div>
                            </div>

                            {/* Rate + Hire button */}
                            <div className="flex items-center gap-3 sm:pb-1">
                                {freelancer.hourlyRate > 0 && (
                                    <div className="text-center">
                                        <p className="text-2xl font-black gradient-text">${freelancer.hourlyRate}</p>
                                        <p className="text-xs text-slate-400 font-medium">per hour</p>
                                    </div>
                                )}
                                <a
                                    href={`mailto:${freelancer.email}`}
                                    className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-6 py-3 rounded-2xl shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 text-sm"
                                >
                                    <Zap size={15} /> Hire Now
                                </a>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-7">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-slate-50 rounded-2xl px-4 py-3 text-center border border-slate-100">
                                    <div className="flex justify-center text-sky-500 mb-1">{stat.icon}</div>
                                    <p className="text-lg font-black text-slate-800">{stat.value}</p>
                                    <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* ─── Two Column Layout ─── */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left: Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* About */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <span className="w-6 h-6 gradient-bg rounded-lg flex items-center justify-center">
                                    <span className="text-white text-xs">👤</span>
                                </span>
                                About Me
                            </h2>
                            <p className="text-slate-600 leading-relaxed">
                                {freelancer.bio || "This freelancer hasn't added a bio yet. Feel free to reach out to learn more about their expertise and experience."}
                            </p>
                        </div>

                        {/* Skills */}
                        {freelancer.skills && freelancer.skills.length > 0 && (
                            <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm">
                                <h2 className="text-lg font-bold text-slate-800 mb-5 flex items-center gap-2">
                                    <span className="w-6 h-6 gradient-bg rounded-lg flex items-center justify-center">
                                        <span className="text-white text-xs">⚡</span>
                                    </span>
                                    Skills & Expertise
                                </h2>
                                <div className="flex flex-wrap gap-2.5">
                                    {freelancer.skills.map((skill, i) => (
                                        <motion.span
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.05 * i }}
                                            className={`px-4 py-2 rounded-xl text-sm font-semibold border ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right: Sidebar Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25, duration: 0.5 }}
                        className="space-y-6"
                    >
                        {/* Quick Info */}
                        <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm">
                            <h2 className="text-base font-bold text-slate-800 mb-5">Quick Info</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3 text-sm">
                                    <div className="w-9 h-9 bg-sky-50 rounded-xl flex items-center justify-center text-sky-600">
                                        <Star size={16} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Rating</p>
                                        <p className="font-bold text-slate-700">5.0 / 5.0</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                        <Briefcase size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Jobs Completed</p>
                                        <p className="font-bold text-slate-700">{freelancer.completedJobs || 0} projects</p>
                                    </div>
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <div className="w-9 h-9 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600">
                                        <Calendar size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-400">Member Since</p>
                                        <p className="font-bold text-slate-700">
                                            {freelancer.createdAt ? new Date(freelancer.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) : "N/A"}
                                        </p>
                                    </div>
                                </li>
                                {freelancer.hourlyRate > 0 && (
                                    <li className="flex items-center gap-3 text-sm">
                                        <div className="w-9 h-9 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600">
                                            <span className="font-black text-sm">$</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400">Hourly Rate</p>
                                            <p className="font-bold text-slate-700">${freelancer.hourlyRate} / hour</p>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>

                        {/* Contact Card */}
                        <div className="rounded-3xl p-6 text-center" style={{ background: "linear-gradient(135deg, #0ea5e9, #6366f1)" }}>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Mail size={22} className="text-white" />
                            </div>
                            <h3 className="text-white font-bold text-base mb-2">Ready to collaborate?</h3>
                            <p className="text-sky-100 text-xs mb-5">Send a message and get started today</p>
                            <a
                                href={`mailto:${freelancer.email}`}
                                className="block w-full bg-white text-sky-700 font-bold py-2.5 rounded-xl text-sm hover:bg-sky-50 transition-colors"
                            >
                                Contact Freelancer
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
