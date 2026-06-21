"use client";

import { Button } from "@heroui/react";

export default function CTASection() {
  return (
    <section className="w-full py-20 px-6 lg:px-20 bg-white">
      {/* কার্ডটি এখন সলিড হোয়াইট কিন্তু হালকা বর্ডার এবং শ্যাডোসহ */}
      <div className="max-w-7xl mx-auto border border-slate-100 bg-white rounded-3xl p-12 lg:p-20 flex flex-col items-center text-center shadow-lg">
        
        {/* টাইটেল - নেভি কালারের টেক্সট */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#001f3f]">
          Ready to transcend limits?
        </h2>
        
        {/* সাব-টেক্সট */}
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
          Join the premier ecosystem where world-class skills meet the world's most ambitious leaders.
        </p>

        {/* বাটনসমূহ - নেভি কালারের বাটন */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            size="lg" 
            className="bg-[#001f3f] text-white font-bold px-8 hover:bg-[#002b5c] transition-all"
          >
            Get Started Now
          </Button>
          <Button 
            size="lg" 
            variant="bordered" 
            className="border-[#001f3f] text-[#001f3f] font-bold px-8 hover:bg-slate-50 transition-all"
          >
            Talk to an Advisor
          </Button>
        </div>
      </div>
    </section>
  );
}