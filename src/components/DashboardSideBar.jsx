"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import toast from "react-hot-toast";
import {
    LayoutDashboard,
    Search,
    FileText,
    BriefcaseBusiness,
    DollarSign,
    UserRound,
    Menu,
    X,
    LogOut,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { Person } from "@gravity-ui/icons";

const DashboardSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { data: session } = authClient.useSession();
     const user = session?.user || null;
     const { id } = useParams(); // ইউআরএল থেকে id টি ধরে ফেলুন
    //  console.log("user session" , user );
        
        const clientMenu =[ 
        { name: "Dashboard", href: "/dashboard/client", icon: LayoutDashboard },
        { name: " Post Tasks", href: "/dashboard/client/tasks/post-task", icon: LayoutDashboard },
        { name: " Browse view Tasks", href :`/dashboard/client/tasks/mytasks`, icon: Search },
        { name: "My Proposals", href: "/dashboard/client/proposal", icon: FileText },
      ];

    const freelancerMenu = [
        { name: "Dashboard", href: "/dashboard/freelancer", icon: LayoutDashboard },
        { name: "Browse Tasks", href: "/dashboard/freelancer/browse-tasks", icon: Search },
        { name: "My Proposals", href: "/dashboard/freelancer/proposals", icon: FileText },
        { name: "Active Projects", href: "/dashboard/freelancer/projects", icon: BriefcaseBusiness },
        { name: "My Earnings", href: "/dashboard/freelancer/earnings", icon: DollarSign },
        { name: "Edit Profile", href: "/dashboard/freelancer/profile", icon: UserRound },
    ];
 
    const adminMenu =[
      { name: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { name: "Manage Users", href: "/dashboard/users", icon: Person},
      { name: "Manage Tasks", href: "/dashboard/Tasks", icon: Search},
      { name: "Transactions History", href: "/dashboard/transactions", icon:  DollarSign},
    ];

    const handleLogout = async () => {
        await authClient.signOut();
        toast.success("Logged out successfully!");
        window.location.href = "/login";
    };

          const role = session?.user?.role;
          
        // const role = "client"
        const menuItem = role === "client" ? clientMenu : role === "freelancer" ? freelancerMenu :
        role === "admin" ? adminMenu : null;


    return (
        <>
            {/* Mobile Header */}
            <div className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-4 py-3 lg:hidden">
                <div className="flex items-center gap-3">
                    <Image
                        width={40}
                        height={40}
                        src={user?.image || "https://i.ibb.co.com/JWMz5JxF/da59647bd31dd524c09991cb89949804-1.jpg"}
                        alt="Profile"
                        className="h-9 w-9 rounded-full border object-cover"
                    />
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800">{user?.name || "client"}</h4>
                        <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] text-blue-600">Freelancer</span>
                    </div>
                </div>
                <button onClick={() => setIsOpen(!isOpen)} className="p-2">
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Sidebar */}
            <aside
                className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col justify-between border-r bg-white p-5 shadow-sm transition-transform duration-300 lg:static lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div>
                    {/* Profile Section */}
                    <div className="mb-8 flex items-center gap-3">
                        <div className="relative">
                            <Image
                                width={48}
                                height={48}
                                src={user?.image || "https://i.ibb.co.com/JWMz5JxF/da59647bd31dd524c09991cb89949804-1.jpg"}
                                alt="Profile"
                                className="h-12 w-12 rounded-full border object-cover"
                            />
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                        </div>
                        <div>
                            <h3 className="max-w-[130px] truncate font-semibold text-gray-800">{user?.name || "client"}</h3>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "freelancer" ? "text-indigo-400" : "text-pink-400"}`}>{role || "Freelancer"}</span>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="space-y-2">
                        {menuItem?.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${active ? "border border-blue-100 bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 ${active ? "text-blue-600" : "text-gray-500"}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Logout Section */}
                <div className="border-t pt-4">
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700 transition hover:bg-red-50 hover:text-red-500"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Overlay for Mobile */}
            {isOpen && (
                <div onClick={() => setIsOpen(false)} className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden" />
            )}
        </>
    );
};

export default DashboardSideBar;