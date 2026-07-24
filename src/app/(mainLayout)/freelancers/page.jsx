"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Star, Briefcase, Clock, ChevronRight } from "lucide-react";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

const SKILL_COLORS = [
    "bg-sky-100 text-sky-700",
    "bg-violet-100 text-violet-700",
    "bg-emerald-100 text-emerald-700",
    "bg-orange-100 text-orange-700",
    "bg-pink-100 text-pink-700",
    "bg-cyan-100 text-cyan-700",
    "bg-indigo-100 text-indigo-700",
    "bg-amber-100 text-amber-700",
];

function getInitials(name = "") {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
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
    const idx = name.charCodeAt(0) % colors.length;
    return colors[idx];
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};
const cardAnim = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

export default function FreelancersPage() {
    const [freelancers, setFreelancers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [skillFilter, setSkillFilter] = useState("All");
    const [allSkills, setAllSkills] = useState([]);

    const fetchFreelancers = async (searchVal = "", skill = "All") => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchVal) params.append("search", searchVal);
            if (skill && skill !== "All") params.append("skill", skill);

            const res = await fetch(`${baseUrl}/api/freelancers?${params}`);
            const data = await res.json();
            if (data.success) {
                setFreelancers(data.data);
                // Collect all unique skills
                const skills = new Set();
                data.data.forEach((f) => (f.skills || []).forEach((s) => skills.add(s)));
                setAllSkills(["All", ...Array.from(skills)]);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFreelancers();
    }, []);

    const handleSearch = (e) => {
        const val = e.target.value;
        setSearch(val);
        fetchFreelancers(val, skillFilter);
    };

    const handleSkill = (skill) => {
        setSkillFilter(skill);
        fetchFreelancers(search, skill);
    };

    return (
        <div className="min-h-screen bg-slate-50">
            {/* ─── Header Banner ─── */}
            <div className="relative overflow-hidden mesh-bg border-b border-sky-100">
                <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block text-sky-600 text-xs font-bold uppercase tracking-widest bg-sky-50 border border-sky-200 px-3 py-1 rounded-full mb-4">
                            Talent Marketplace
                        </span>
                        <h1 className="section-title text-4xl md:text-5xl text-slate-900 mb-3">
                            Browse <span className="gradient-text">Freelancers</span>
                        </h1>
                        <p className="text-slate-500 text-lg max-w-lg">
                            Discover top-rated professionals ready to bring your vision to life.
                        </p>
                    </motion.div>

                    {/* Search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl"
                    >
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name or skill..."
                                value={search}
                                onChange={handleSearch}
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 shadow-sm placeholder-slate-400 focus:ring-2 focus:ring-sky-300 focus:border-sky-400 transition-all"
                            />
                        </div>
                    </motion.div>

                    {/* Skill filter chips */}
                    {allSkills.length > 1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.35 }}
                            className="mt-4 flex flex-wrap gap-2"
                        >
                            {allSkills.slice(0, 12).map((skill) => (
                                <button
                                    key={skill}
                                    onClick={() => handleSkill(skill)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                                        skillFilter === skill
                                            ? "gradient-bg text-white border-transparent shadow-md"
                                            : "bg-white text-slate-600 border-slate-200 hover:border-sky-400 hover:text-sky-600"
                                    }`}
                                >
                                    {skill}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* ─── Freelancers Grid ─── */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Count */}
                <div className="flex items-center justify-between mb-8">
                    <p className="text-sm font-semibold text-slate-500">
                        {loading ? "Loading..." : `${freelancers.length} freelancer${freelancers.length !== 1 ? "s" : ""} found`}
                    </p>
                </div>

                {/* Loading Skeleton */}
                {loading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="skeleton w-14 h-14 rounded-full" />
                                    <div className="flex-1 space-y-2">
                                        <div className="skeleton h-4 w-3/4 rounded" />
                                        <div className="skeleton h-3 w-1/2 rounded" />
                                    </div>
                                </div>
                                <div className="skeleton h-3 w-full rounded mb-2" />
                                <div className="skeleton h-3 w-5/6 rounded mb-5" />
                                <div className="flex gap-2">
                                    <div className="skeleton h-6 w-16 rounded-full" />
                                    <div className="skeleton h-6 w-16 rounded-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && freelancers.length === 0 && (
                    <div className="text-center py-24">
                        <div className="w-20 h-20 mx-auto mb-5 bg-slate-100 rounded-full flex items-center justify-center text-3xl">
                            🔍
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-2">No freelancers found</h3>
                        <p className="text-slate-400 text-sm">Try adjusting your search or filter</p>
                    </div>
                )}

                {/* Cards Grid */}
                {!loading && freelancers.length > 0 && (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {freelancers.map((freelancer) => (
                            <motion.div key={freelancer._id} variants={cardAnim}>
                                <Link href={`/freelancers/${freelancer._id}`} className="block group">
                                    <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:shadow-sky-100/50 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                                        {/* Top: Avatar + Name + Rate */}
                                        <div className="flex items-start gap-4 mb-5">
                                            {freelancer.image ? (
                                                <img
                                                    src={freelancer.image}
                                                    alt={freelancer.name}
                                                    className="w-14 h-14 rounded-xl object-cover border-2 border-sky-100 flex-shrink-0"
                                                />
                                            ) : (
                                                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getAvatarColor(freelancer.name)} flex items-center justify-center text-white font-black text-lg flex-shrink-0`}>
                                                    {getInitials(freelancer.name)}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-slate-800 text-base truncate group-hover:text-sky-600 transition-colors duration-200">
                                                    {freelancer.name}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-1">
                                                    {freelancer.hourlyRate ? (
                                                        <span className="text-sm font-bold text-sky-600">
                                                            ${freelancer.hourlyRate}/hr
                                                        </span>
                                                    ) : (
                                                        <span className="text-xs text-slate-400">Rate not set</span>
                                                    )}
                                                    <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                                                        <Star size={12} fill="currentColor" /> 5.0
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 mb-5 flex-1">
                                            {freelancer.bio || "No bio available. Hire this freelancer to learn more."}
                                        </p>

                                        {/* Skills */}
                                        {freelancer.skills && freelancer.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {freelancer.skills.slice(0, 4).map((skill, i) => (
                                                    <span
                                                        key={i}
                                                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${SKILL_COLORS[i % SKILL_COLORS.length]}`}
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {freelancer.skills.length > 4 && (
                                                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-500">
                                                        +{freelancer.skills.length - 4}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                            <span className="flex items-center gap-1.5 text-xs text-slate-400">
                                                <Briefcase size={12} />
                                                {freelancer.completedJobs || 0} jobs done
                                            </span>
                                            <span className="flex items-center gap-1 text-xs font-semibold text-sky-600 group-hover:gap-2 transition-all duration-200">
                                                View Profile <ChevronRight size={13} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}