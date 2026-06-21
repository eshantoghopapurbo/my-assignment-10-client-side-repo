"use client";

import { Button } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    // এখানে w-full এবং bg-white নিশ্চিত করা হলো
    <div className="w-full bg-white"> 
      <section className="relative w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between px-6 py-20 lg:px-20 bg-white overflow-hidden">
        
        {/* বাম পাশের টেক্সট কন্টেন্ট */}
        <div className="max-w-2xl space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full border shadow-sm"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-600">Trust by 50k+ Companies</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight"
          >
            Get your tasks done by <span className="text-blue-600">skilled freelancers</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg text-slate-600 max-w-lg"
          >
            Bridge the gap between vision and reality. Access a global elite of vetted freelancers for high-stakes micro-tasks.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <Button color="primary" size="lg" className="font-semibold">
              Post a Task
            </Button>
            <Button variant="bordered" size="lg" className="font-semibold">
              Browse Tasks
            </Button>
          </motion.div>
        </div>

        {/* ডান পাশের ইমেজ */}
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden lg:block w-full max-w-lg mt-12 lg:mt-0"
        >
          <Image
            src="https://i.ibb.co.com/ks1GYSXQ/herosection.jpg" 
            alt="image"
            width={600}
            height={500}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
      </section>
    </div>
  );
}