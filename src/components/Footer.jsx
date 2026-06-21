"use client";

import React from 'react';
import { Globe, Envelope, Briefcase, ShieldCheck } from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="container mx-auto  text-white py-16 px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        
       
        <div className="space-y-6">
          <h2 className="font-extrabold text-2xl text-blue-600 dark:text-blue-500 tracking-tight">SkillSwap</h2>
          <p className="text-gray-500 leading-relaxed max-w-xs">
            The global standard for professional freelance excellence. Excellence is not a choice, it's our baseline.
          </p>
          <div className="flex gap-4 text-gray-500">
            <Globe size={20} />
            <Envelope size={20} />
            <Briefcase size={20} />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-black">Platform</h3>
          <ul className="space-y-4 text-gray-500">
            <li className="cursor-pointer transition">Browse Tasks</li>
            <li className="cursor-pointer transition">Find Talent</li>
            <li className="cursor-pointer transition">Elite Vetting</li>
            <li className="cursor-pointer transition">Enterprise Solutions</li>
          </ul>
        </div>

       
        <div className="space-y-6">
          <h3 className="text-xs font-bold uppercase tracking-widest text-black">Support</h3>
          <ul className="space-y-4 text-gray-500">
            <li className="cursor-pointer transition">Privacy Hub</li>
            <li className="cursor-pointer transition">Service Terms</li>
            <li className="cursor-pointer transition">Community</li>
            <li className="cursor-pointer transition">Direct Support</li>
          </ul>
        </div>
      </div>

     
      <div className="max-w-7xl mx-auto mt-16 border-t border-gray-500 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2024 SkillSwap Marketplace. Built for the modern workforce.</p>
        
        <div className="flex gap-8 mt-4 md:mt-0">
          <div className="flex items-center gap-2 hover:text-white cursor-pointer transition">
            <Globe size={16} /> English (USD)
          </div>
          <div className="flex items-center gap-2 hover:text-white cursor-pointer transition">
            <ShieldCheck size={16} /> SSL Secure
          </div>
        </div>
      </div>
    </footer>
  );
}