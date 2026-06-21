"use client";

import { Card, CardBody } from "@heroui/react";

const steps = [
  {
    number: "1",
    // আপনি চাইলে এখানে Gravity UI Icons ব্যবহার করতে পারেন
    icon: <span className="text-3xl">📝</span>, 
    title: "Post a Task",
    description: "Define your project requirements, timeline, and budget. It only takes a few minutes to get started.",
  },
  {
    number: "2",
    icon: <span className="text-3xl">👥</span>,
    title: "Hire the Best",
    description: "Review portfolios, check ratings, and interview freelancers. Choose the perfect match for your specific task.",
  },
  {
    number: "3",
    icon: <span className="text-3xl">✅</span>,
    title: "Task Done",
    description: "Release payment only when you are 100% satisfied. Seamless transactions through our secure marketplace.",
  },
];

export default function WorksSection() {
  return (
    <section className="py-20 bg-white">
      {/* হেডার অংশ */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900">How it Works</h2>
        <p className="text-slate-500 mt-2">Simple steps to get your value exchanged</p>
      </div>

      {/* মেইন কন্টেইনার */}
      <div className="relative max-w-5xl mx-auto px-6">
        {/* ইমেজের মতো লাইনটি */}
        <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 z-0"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative z-10">
              {/* আইকন সার্কেল */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                  {step.icon}
                </div>
                {/* গ্রিন নাম্বার ব্যাজ */}
                <div className="absolute -top-1 -right-1 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-white">
                  {step.number}
                </div>
              </div>

              {/* টেক্সট অংশ */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
              <p className="text-slate-500 text-center leading-relaxed px-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}