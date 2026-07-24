"use client";

import React from 'react';
import { Globe, Envelope, Briefcase, ShieldCheck } from "@gravity-ui/icons";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6 md:px-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        <div className="space-y-4">
          <Link href="/" className="font-extrabold text-2xl text-cyan-400 tracking-tight">
            SkillSwap
          </Link>
          <p className="text-gray-400 text-xs leading-relaxed">
            SkillSwap is a freelance micro-task marketplace linking clients with top talent for quick visual design, writing, and dev jobs.
          </p>
          <div className="flex gap-4 text-gray-400 pt-2">
            <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
              <FaXTwitter size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition">
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">Navigation</h3>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><Link href="/" className="hover:text-cyan-400 transition">Home</Link></li>
            <li><Link href="/tasks" className="hover:text-cyan-400 transition">Browse Tasks</Link></li>
            <li><Link href="/freelancers" className="hover:text-cyan-400 transition">Browse Freelancers</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">Support & Contact</h3>
          <ul className="space-y-2 text-xs text-gray-400">
            <li>Email: support@skillswap.com</li>
            <li>WhatsApp: 01625337883</li>
            <li>Community Guidelines</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest text-white">Security</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Encrypted transactions powered by Stripe Checkout. Verified BetterAuth user accounts.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
            <ShieldCheck size={16} /> 256-Bit SSL Encryption
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>© {new Date().getFullYear()} SkillSwap Marketplace. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <span className="flex items-center gap-1.5"><Globe size={14} /> English (USD)</span>
        </div>
      </div>
    </footer>
  );
}