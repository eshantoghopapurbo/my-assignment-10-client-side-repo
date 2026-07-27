"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars, LayoutColumns, Xmark } from "@gravity-ui/icons";
import { authClient, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NavbarPage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const { data: session, isPending } = useSession();
    console.log(session);
    const user = session?.user;
    const router = useRouter();

    const dashboardLink = user
        ? (user.role === 'freelancer' ? '/dashboard/freelancer' : user.role === 'client' ? '/dashboard/client' : user.role === "admin" ? '/dashboard/admin' : "/dashboard/client")
        : '/login';

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/login");
                },
            },
        });
    };

    const menuItems = [
        { label: "Home", href: "/" },
        { label: "Browse Tasks", href: "/tasks" },
        { label: "Freelancers", href: "/freelancers" },
        ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-sky-100/60 bg-white/80 backdrop-blur-xl transition-all duration-300 shadow-sm shadow-sky-100/20">
            <header className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                {/* Logo + Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        className="md:hidden text-slate-600 p-2 hover:bg-sky-50 rounded-xl transition-all duration-200 active:scale-95"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <Xmark className="h-5 w-5" /> : <Bars className="h-5 w-5" />}
                    </button>

                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-xl gradient-bg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200">
                            <span className="text-white font-black text-sm">S</span>
                        </div>
                        <span className="font-extrabold text-xl tracking-tight gradient-text">
                            SkillSwap
                        </span>
                    </Link>
                </div>

                {/* Desktop Nav Links */}
                <ul className="hidden items-center gap-1 md:flex">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                        ? "bg-sky-50 text-sky-600"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                                        }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-sky-500 rounded-full" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Right Side: Auth */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href={dashboardLink}
                                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors px-3 py-2 rounded-xl hover:bg-sky-50"
                            >
                                <LayoutColumns size={15} />
                                Dashboard
                            </Link>
                            <div className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 px-2 py-1.5 rounded-xl transition-all duration-200 cursor-pointer group">
                                <Image
                                    width={32}
                                    height={32}
                                    className="h-8 w-8 rounded-full object-cover border-2 border-sky-400 group-hover:border-sky-500 transition-all"
                                    src={user?.image || "https://i.ibb.co.com/JWMz5JxF/da59647bd31dd524c09991cb89949804-1.jpg"}
                                    alt={user.name || "User"}
                                />
                                <span className="hidden md:block text-xs font-semibold text-slate-700 max-w-[80px] truncate">
                                    {user.name}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 hover:bg-red-50 px-3 py-2 rounded-xl transition-all duration-200"
                            >
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/login"
                                className="hidden sm:inline-block text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors px-4 py-2 rounded-xl hover:bg-sky-50"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/register"
                                className="inline-flex items-center justify-center gradient-bg text-white font-semibold rounded-xl text-sm px-5 py-2.5 transition-all duration-200 shadow-md shadow-sky-200 hover:shadow-lg hover:shadow-sky-300 hover:-translate-y-0.5 active:translate-y-0"
                            >
                                Join Free
                            </Link>
                        </div>
                    )}
                </div>
            </header>

            {/* Mobile Dropdown */}
            {isMenuOpen && (
                <div className="border-t border-sky-100 bg-white/95 backdrop-blur-sm md:hidden animate-fadeIn">
                    <ul className="flex flex-col gap-1 p-4">
                        {menuItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center py-2.5 px-3 text-sm rounded-xl transition-all duration-200 font-medium ${isActive
                                            ? "bg-sky-50 text-sky-600"
                                            : "text-slate-600 hover:bg-slate-50"
                                            }`}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="my-1 border-t border-gray-100" />
                        {user ? (
                            <>
                                <li>
                                    <Link
                                        href={dashboardLink}
                                        className="flex items-center gap-2 py-2.5 px-3 text-sm text-slate-600 hover:bg-sky-50 hover:text-sky-600 rounded-xl transition-all"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <LayoutColumns size={16} /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 w-full py-2.5 px-3 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all text-left"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link href="/login" className="block py-2.5 px-3 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Log In</Link>
                                </li>
                                <li>
                                    <Link href="/register" className="block w-full text-center gradient-bg text-white font-semibold py-2.5 px-3 text-sm rounded-xl mt-1" onClick={() => setIsMenuOpen(false)}>Join Free</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
}