"use client";

import { motion } from "framer-motion";

const steps = [
    {
        number: "01",
        emoji: "📝",
        title: "Post a Task",
        description: "Define your project requirements, timeline, and budget. It only takes a few minutes to get started.",
        color: "sky",
        bg: "from-sky-50 to-blue-50",
        iconBg: "from-sky-400 to-blue-500",
        glow: "shadow-sky-200",
    },
    {
        number: "02",
        emoji: "👥",
        title: "Hire the Best",
        description: "Review portfolios, check ratings, and interview freelancers. Choose the perfect match for your specific task.",
        color: "violet",
        bg: "from-violet-50 to-indigo-50",
        iconBg: "from-violet-400 to-indigo-500",
        glow: "shadow-violet-200",
    },
    {
        number: "03",
        emoji: "🚀",
        title: "Task Done",
        description: "Release payment only when you are 100% satisfied. Seamless transactions through our secure marketplace.",
        color: "emerald",
        bg: "from-emerald-50 to-teal-50",
        iconBg: "from-emerald-400 to-teal-500",
        glow: "shadow-emerald-200",
    },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
};
const item = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function HowItWorks() {
    return (
        <section className="w-full bg-white py-24 px-6 lg:px-20 relative overflow-hidden">
            {/* subtle background decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[1px] bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block text-sky-600 text-sm font-bold uppercase tracking-widest mb-3 bg-sky-50 px-4 py-1.5 rounded-full">
                        Simple Process
                    </span>
                    <h2 className="section-title text-4xl md:text-5xl text-slate-900 mt-3">
                        How it <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-slate-500 mt-4 text-lg max-w-xl mx-auto">
                        Three simple steps to get your task done with quality and speed
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
                >
                    {/* Connector line */}
                    <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-sky-200 via-violet-200 to-emerald-200 z-0" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            className={`relative z-10 bg-gradient-to-br ${step.bg} border border-white rounded-3xl p-8 flex flex-col items-center text-center shadow-sm hover:shadow-xl hover:shadow-${step.color}-100 transition-all duration-300 group card-hover cursor-default`}
                        >
                            {/* Step number badge */}
                            <div className="absolute top-4 right-4 text-xs font-black text-slate-300 tracking-widest">
                                {step.number}
                            </div>

                            {/* Icon */}
                            <div className={`relative mb-6 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.iconBg} shadow-xl ${step.glow} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                <span className="text-3xl">{step.emoji}</span>
                            </div>

                            {/* Text */}
                            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-600 transition-colors duration-200">
                                {step.title}
                            </h3>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}