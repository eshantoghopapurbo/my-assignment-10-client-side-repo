"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection() {
    return (
        <section className="w-full py-24 px-6 lg:px-20 bg-white">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-7xl mx-auto relative overflow-hidden rounded-3xl p-1"
                style={{
                    background: "linear-gradient(135deg, #0ea5e9, #6366f1, #10b981)"
                }}
            >
                {/* Inner card */}
                <div className="relative rounded-[20px] overflow-hidden">
                    {/* Dark overlay with mesh */}
                    <div
                        className="relative px-8 py-20 md:py-24 flex flex-col items-center text-center"
                        style={{
                            background: "linear-gradient(135deg, #0c2340 0%, #0f172a 50%, #0c1a2e 100%)"
                        }}
                    >
                        {/* Decorative blobs */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-emerald-400/5 rounded-full blur-2xl" />

                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-400/30 bg-sky-400/10 mb-6"
                        >
                            <span className="w-2 h-2 bg-sky-400 rounded-full animate-pulse" />
                            <span className="text-sky-300 text-sm font-semibold">Now accepting new members</span>
                        </motion.div>

                        {/* Headline */}
                        <h2 className="section-title text-4xl md:text-6xl text-white leading-tight max-w-2xl mb-6 relative z-10">
                            Ready to{" "}
                            <span
                                className="text-transparent"
                                style={{
                                    WebkitTextFillColor: "transparent",
                                    backgroundImage: "linear-gradient(90deg, #38bdf8, #818cf8)",
                                    WebkitBackgroundClip: "text",
                                    backgroundClip: "text"
                                }}
                            >
                                transcend limits?
                            </span>
                        </h2>

                        {/* Subtext */}
                        <p className="text-slate-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed relative z-10">
                            Join the premier ecosystem where world-class skills meet the world's
                            most ambitious leaders. Start for free today.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
                            <Link
                                href="/register"
                                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
                            >
                                Get Started Free
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7"/>
                                </svg>
                            </Link>
                            <Link
                                href="/tasks"
                                className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-8 py-3.5 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-200 active:translate-y-0"
                            >
                                Browse Tasks
                            </Link>
                        </div>

                        {/* Trust indicators */}
                        <div className="mt-10 flex flex-wrap justify-center gap-6 text-slate-400 text-xs relative z-10">
                            <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> No hidden fees</span>
                            <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> Secure Payments</span>
                            <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg> Cancel anytime</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}