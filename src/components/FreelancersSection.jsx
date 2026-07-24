"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Briefcase, ChevronRight, ArrowRight } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const SKILL_COLORS = [
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700",
    "bg-orange-100 text-orange-700",
    "bg-pink-100 text-pink-700",
    "bg-cyan-100 text-cyan-700",
    "bg-amber-100 text-amber-700",
    "bg-indigo-100 text-indigo-700",
];

const AVATAR_GRADIENTS = [
    "from-sky-400 to-blue-600",
    "from-violet-400 to-purple-600",
    "from-emerald-400 to-teal-600",
    "from-orange-400 to-amber-600",
    "from-pink-400 to-rose-600",
    "from-cyan-400 to-sky-600",
];

function getInitials(name = "") {
    return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getGradient(name = "") {
    return AVATAR_GRADIENTS[name.charCodeAt(0) % AVATAR_GRADIENTS.length];
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

const cardAnim = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function FreelancersSection() {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${baseUrl}/api/freelancers`)
            .then((r) => r.json())
            .then((data) => {
                if (data.success) {
                    // Show max 4 freelancers on home page
                    setFreelancers(data.data.slice(0, 4));
                }
            })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="w-full bg-slate-50 py-24 px-6 lg:px-20 relative overflow-hidden">
            {/* Subtle background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-sky-200 to-transparent" />
            <div className="absolute top-10 right-0 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-sky-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative">
                {/* ─── Section Header ─── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14"
                >
                    <div>
                        <span className="inline-block text-sky-600 text-xs font-bold uppercase tracking-widest bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-full mb-3">
                            Top Talent
                        </span>
                        <h2 className="section-title text-4xl md:text-5xl text-slate-900">
                            Meet Our <span className="gradient-text">Top Freelancers</span>
                        </h2>
                        <p className="text-slate-500 mt-3 text-base max-w-lg">
                            Handpicked professionals ready to deliver exceptional results for your projects.
                        </p>
                    </div>
                    <Link
                        href="/freelancers"
                        className="inline-flex items-center gap-2 text-sm font-bold text-sky-600 hover:text-sky-700 hover:gap-3 transition-all duration-200 group flex-shrink-0"
                    >
                        View All Freelancers
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>
                </motion.div>

                {/* ─── Loading Skeletons ─── */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                                <div className="flex flex-col items-center gap-3 mb-5">
                                    <div className="skeleton w-20 h-20 rounded-2xl" />
                                    <div className="skeleton h-4 w-28 rounded" />
                                    <div className="skeleton h-3 w-20 rounded" />
                                </div>
                                <div className="skeleton h-3 w-full rounded mb-1.5" />
                                <div className="skeleton h-3 w-4/5 rounded mb-5" />
                                <div className="flex gap-2 justify-center">
                                    <div className="skeleton h-6 w-14 rounded-lg" />
                                    <div className="skeleton h-6 w-14 rounded-lg" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* ─── Freelancer Cards ─── */}
                {!loading && freelancers.length > 0 && (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {freelancers.map((freelancer, idx) => (
                            <motion.div key={freelancer._id} variants={cardAnim}>
                                <Link href={`/freelancers/${freelancer._id}`} className="block group h-full">
                                    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:shadow-sky-100/60 hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center h-full relative overflow-hidden">
                                        {/* Decorative gradient corner */}
                                        <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 bg-gradient-to-br from-sky-300 to-indigo-400" />

                                        {/* Avatar */}
                                        <div className="relative mb-5 mt-1">
                                            {freelancer.image ? (
                                                <img
                                                    src={freelancer.image}
                                                    alt={freelancer.name}
                                                    className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-100 shadow-md group-hover:border-sky-200 transition-all duration-300"
                                                />
                                            ) : (
                                                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${getGradient(freelancer.name)} flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                                                    {getInitials(freelancer.name)}
                                                </div>
                                            )}
                                            {/* Online badge */}
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full border-2 border-white shadow-sm" />
                                        </div>

                                        {/* Name */}
                                        <h3 className="font-bold text-slate-800 text-base mb-1 group-hover:text-sky-600 transition-colors duration-200">
                                            {freelancer.name}
                                        </h3>

                                        {/* Rating */}
                                        <div className="flex items-center gap-1 mb-2">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star key={s} size={11} className="text-amber-400" fill="currentColor" />
                                            ))}
                                            <span className="text-xs text-slate-400 ml-1">5.0</span>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4 flex-1">
                                            {freelancer.bio || "Experienced freelancer ready to help with your projects."}
                                        </p>

                                        {/* Skills */}
                                        {freelancer.skills && freelancer.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 justify-center mb-4">
                                                {freelancer.skills.slice(0, 3).map((skill, i) => (
                                                    <span key={i} className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${SKILL_COLORS[i % SKILL_COLORS.length]}`}>
                                                        {skill}
                                                    </span>
                                                ))}
                                                {freelancer.skills.length > 3 && (
                                                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500">
                                                        +{freelancer.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Rate + Jobs */}
                                        <div className="flex items-center justify-between w-full pt-4 border-t border-slate-50">
                                            <div className="text-left">
                                                {freelancer.hourlyRate ? (
                                                    <span className="text-base font-black gradient-text">
                                                        ${freelancer.hourlyRate}/hr
                                                    </span>
                                                ) : (
                                                    <span className="text-xs text-slate-400">Price TBD</span>
                                                )}
                                            </div>
                                            <span className="flex items-center gap-1 text-xs text-slate-400">
                                                <Briefcase size={11} />
                                                {freelancer.completedJobs || 0} jobs
                                            </span>
                                        </div>

                                        {/* Hover reveal CTA */}
                                        <div className="w-full mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                            <span className="flex items-center justify-center gap-1.5 text-xs font-bold text-sky-600">
                                                View Profile <ChevronRight size={13} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Empty state */}
                {!loading && freelancers.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">👥</div>
                        <p className="text-slate-400 font-medium">No freelancers available yet.</p>
                        <Link href="/register" className="inline-block mt-4 gradient-bg text-white font-bold px-6 py-2.5 rounded-xl text-sm hover:-translate-y-0.5 transition-all duration-200">
                            Join as Freelancer
                        </Link>
                    </div>
                )}

                {/* Bottom CTA */}
                {!loading && freelancers.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <Link
                            href="/freelancers"
                            className="inline-flex items-center gap-2.5 gradient-bg text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0 text-sm"
                        >
                            <span>Explore All Freelancers</span>
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
