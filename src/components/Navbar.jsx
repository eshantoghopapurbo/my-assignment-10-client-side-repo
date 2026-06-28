"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // ১. usePathname ইমপোর্ট করলেন
import { Bars, LayoutColumns, Xmark } from "@gravity-ui/icons";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
//  import { ThemeSwitcher } from "./ThemeSwitcher";

export default function NavbarPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, isPending } = useSession();

    const user = session?.user;
    const router = useRouter();

    const dashboardLink = user
        ? (user.role === 'freelancer' ? '/dashboard/freelancer' : '/dashboard/client')
        : '/login';
    // const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login"); // redirect to login page
                },
            },
        });
    };

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
                    {
                        user ?
                            <>
                                <div className="flex relative">
                                    <div className="hidden md:block mt-2">
                                        <Link
                                            href={dashboardLink}
                                            className="flex items-center gap-2 px-5 py-2.5 font-medium transition-all active:scale-95 text-sm"
                                        >
                                            <LayoutColumns size={18} />
                                            <span>Dashboard</span>
                                        </Link>
                                    </div>

                                    <button
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="flex items-center space-x-3 focus:outline-none bg-gray-50 hover:bg-gray-100 p-2 rounded-full md:rounded-lg transition-all duration-200"
                                    >
                                        <span className="hidden md:block text-sm font-medium text-gray-750">
                                            {user.name}
                                        </span>

                                        <Image
                                            width={100}
                                            height={100}
                                            className="h-9 w-9 rounded-full object-cover border-2 border-indigo-500"
                                            src={user?.image}
                                            alt={user.name}
                                        />
                                        <svg className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center text-s px-4 py-2.5 text-sm text-red-650 hover:bg-red-50 hover:text-red-600 transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </>
                            :
                            <>
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
                            </>}
                </div>
            </header>

            {/* মোবাইল স্ক্রিনের জন্য ড্রপডাউন মেনু */}
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

                        <li className="my-2 border-t border-gray-100 dark:border-zinc-800" />

                        {/* এখানে কন্ডিশন চেক করছি: ইউজার লগইন থাকলে ড্যাশবোর্ড দেখাবে, না থাকলে লগইন/রেজিস্টার */}
                        {user ? (
                            <li>
                                <Link
                                    href="/dashboard/client"
                                    className={`block py-2 px-3 text-base rounded-lg transition-colors ${pathname === "/dashboard"
                                        ? "flex items-center gap-2 bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-500 font-semibold"
                                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900"
                                        }`}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <LayoutColumns size={18} />  Dashboard
                                </Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link
                                        href="/login"
                                        className="block py-2 px-3 text-base text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Log In
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/register"
                                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-full text-sm px-5 py-2 transition-all shadow-sm hover:shadow"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Join Now
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}