"use client";
import { useEffect, useState } from "react";
import { getMyTasks } from "@/lib/actions/tasks";
import { authClient } from "@/lib/auth-client";
import { Briefcase, Clock, Edit3, Filter, Search, Trash2 } from "lucide-react";
import Link from "next/link";
import { div } from "framer-motion/client";
import { Button } from "@heroui/react";

const MyTasksPage = () => {

    const { data: session } = authClient.useSession();
    const email = session?.user?.email || null;
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (!email) return;
        getMyTasks(email).then((data) => setTasks(data));
    }, [email]);

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-extrabold mb-6">My Posted Tasks</h2>

            {/* Filter Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {/* Search Input */}
                <div className="relative flex-[2]">
                    <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative flex-1">
                    <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
                    <select className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-600 appearance-none">
                        <option>All Categories</option>
                        <option>Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                    </select>
                </div>

                {/* Status Filter */}
                <select className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-600 flex-1">
                    <option>All Status</option>
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
            </div>

            {/* Card Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                    <div
                        key={task._id}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-4 group"
                    >
                        {/* টাস্ক ইনফো */}
                        <div className="space-y-3">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                                {task.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
                                    <Briefcase size={13} /> {task.category}
                                </span>
                                <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
                                    <Clock size={13} /> {task.deadline}
                                </span>
                            </div>
                        </div>

                        {/* স্ট্যাটাস ও অ্যাকশন বাটন */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold  uppercase tracking-wider ${task.status === 'Open' ? 'bg-cyan-50 text-cyan-700' :
                                    task.status === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                                        'bg-emerald-50 text-emerald-700'
                                }`}>
                                {task.status}
                            </span>

                            <Button
                                variant="outline"
                                className="text-xs h-8 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all rounded-lg"
                            >
                                <Link href={`/dashboard/client/tasks/mytasks/${task._id}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyTasksPage;