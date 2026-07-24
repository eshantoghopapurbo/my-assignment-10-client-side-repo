"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
    { value: "50K+", label: "Tasks Completed" },
    { value: "12K+", label: "Active Freelancers" },
    { value: "98%", label: "Client Satisfaction" },
];

export default function HeroSection() {
    return (
        <section className="relative w-full mesh-bg overflow-hidden">
            {/* Decorative blobs */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-20 lg:py-28 lg:px-16 gap-12">
                {/* Left Content */}
                <div className="max-w-xl space-y-7 z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-full border border-sky-200/50 shadow-sm"
                    >
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-sky-700">Trusted by 50K+ Companies</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.55 }}
                        className="section-title text-5xl md:text-6xl text-slate-900 leading-[1.1]"
                    >
                        Get your tasks done by{" "}
                        <span className="gradient-text">skilled freelancers</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.28, duration: 0.5 }}
                        className="text-lg text-slate-500 leading-relaxed"
                    >
                        Bridge the gap between vision and reality. Access a global elite of vetted
                        freelancers for fast, high-quality micro-tasks.
                    </motion.p>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex flex-wrap gap-4"
                    >
                        <Link
                            href="/dashboard/client/tasks/posttask"
                            className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-7 py-3.5 rounded-2xl shadow-lg shadow-sky-200 hover:shadow-xl hover:shadow-sky-300 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"/></svg>
                            Post a Task
                        </Link>
                        <Link
                            href="/tasks"
                            className="inline-flex items-center gap-2 bg-white text-slate-700 font-bold px-7 py-3.5 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 hover:text-sky-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
                        >
                            Browse Tasks
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/></svg>
                        </Link>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55, duration: 0.6 }}
                        className="flex flex-wrap gap-6 pt-2"
                    >
                        {stats.map((s, i) => (
                            <div key={i} className="flex flex-col">
                                <span className="text-2xl font-extrabold gradient-text">{s.value}</span>
                                <span className="text-xs text-slate-500 font-medium">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    className="hidden lg:block relative w-full max-w-lg flex-shrink-0 z-10"
                >
                    {/* Floating card 1 */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-4 -left-8 glass rounded-2xl p-3 shadow-xl border border-white/60 z-20"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold text-sm">✓</div>
                            <div>
                                <p className="text-xs font-bold text-slate-700">Task Completed</p>
                                <p className="text-xs text-slate-400">Logo Design · $150</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Floating card 2 */}
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute -bottom-4 -right-8 glass rounded-2xl p-3 shadow-xl border border-white/60 z-20"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center text-sky-600">⭐</div>
                            <div>
                                <p className="text-xs font-bold text-slate-700">5.0 Rating</p>
                                <p className="text-xs text-slate-400">Top Freelancer</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -16, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <Image
                            src="https://i.ibb.co.com/ks1GYSXQ/herosection.jpg"
                            alt="SkillSwap Freelance Platform"
                            width={600}
                            height={500}
                            className="rounded-3xl shadow-2xl shadow-sky-200/40 border-4 border-white/80"
                            priority
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}