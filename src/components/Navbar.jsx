"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ১. usePathname ইমপোর্ট করলেন
import { Bars, Xmark } from "@gravity-ui/icons";
//  import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavbarPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname(); // ২. কারেন্ট পেজের পাথ নেওয়ার জন্য হুকটি কল করলেন

    // এখন আর আলাদা করে isActive দেওয়ার দরকার নেই
    const menuItems = [
        { label: "Home", href: "/" },
        { label: "Browse Tasks", href: "/tasks" },
        { label: "Freelancers", href: "/freelancers" },
        { label: "Solutions", href: "/solutions" },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-zinc-800
         bg-white/80  backdrop-blur-lg transition-colors duration-300">
            <header className="container mx-auto flex h-16 items-center justify-between px-6">

                {/* বামপাশ: মোবাইল মেনু বাটন এবং লোগো */}
                <div className="flex items-center gap-4">
                    <button
                        className="sm:hidden text-gray-600 dark:text-gray-300 p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
                    </button>

                    <Link href="/" className="font-extrabold text-3xl text-blue-600 dark:text-blue-500 tracking-tight">
                        SkillSwap
                    </Link>
                </div>

                {/* মাঝখান: ডেক্সটপ স্ক্রিনের জন্য মেনু লিংক (ডায়নামিক অ্যাক্টিভ স্টেট সহ) */}
                <ul className="hidden items-center gap-6 sm:flex">
                    {menuItems.map((item, index) => {
                        // এখানে চেক করা হচ্ছে কারেন্ট URL-এর সাথে লিংকের href মিলছে কিনা
                        const isActive = pathname === item.href;

                        return (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className={`text-base font-semibold transition-colors pb-1.5 ${ // টেক্সট text-base এবং একটু মোটা (font-semibold) করা হলো
                                        isActive
                                            ? "text-blue-600 dark:text-blue-500 border-b-2 border-blue-600"
                                            : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* ডানপাশ: থিম সুইচার, লগইন এবং জয়েন বাটন */}
                <div className="flex items-center gap-4">
                    {/* <ThemeSwitcher /> */}
                    <Link
                        href="/login"
                        className="hidden sm:inline-block text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                    >
                        Log In
                    </Link>
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-full text-sm px-5 py-2 transition-all shadow-sm hover:shadow"
                    >
                        Join Now
                    </Link>
                </div>
            </header>

            {/* মোবাইল স্ক্রিনের জন্য ড্রপডাউন মেনু (এখানেও অ্যাক্টিভ স্টেট কাজ করবে) */}
            {isMenuOpen && (
                <div className="border-t border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-950 sm:hidden transition-all">
                    <ul className="flex flex-col gap-1 p-4">
                        {menuItems.map((item, index) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        className={`block py-2 px-3 text-base rounded-lg transition-colors ${isActive
                                            ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-500 font-semibold"
                                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900"
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="my-2 border-t  border-gray-100 dark:border-zinc-800" />
                        <li>
                            <link
                                href="/login"
                                className="block py-2 px-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Log In
                            </link>
                        </li>
                        <li>
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-full text-sm px-5 py-2 transition-all shadow-sm hover:shadow"
                            >
                                Join Now
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}