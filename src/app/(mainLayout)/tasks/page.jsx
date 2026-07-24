"use client";
import { useEffect, useState } from "react";
import { Briefcase, Clock, Filter, Search, ChevronLeft, ChevronRight, DollarSign } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { getallTasks } from "@/lib/actions/tasks";

const BrowseTasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalTasks, setTotalTasks] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const data = await getallTasks(page, 9, searchTerm, categoryFilter);
            if (data.tasks) {
                setTasks(data.tasks);
                setTotalPages(data.totalPages || 1);
                setTotalTasks(data.totalTasks || 0);
            } else if (Array.isArray(data)) {
                setTasks(data);
                setTotalPages(1);
                setTotalTasks(data.length);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [page, categoryFilter]);

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchTasks();
    };

    return (
        <div className="p-4 md:p-8 container mx-auto min-h-screen">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Browse Available Tasks</h1>
                    <p className="text-gray-500 text-sm mt-1">Discover micro-tasks posted by clients and place your proposals</p>
                </div>
                <div className="bg-cyan-50 border border-cyan-100 px-4 py-2 rounded-xl text-cyan-800 text-xs font-semibold">
                    Total Available: {totalTasks} Tasks
                </div>
            </div>

            {/* Filter Section */}
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                {/* Search Input */}
                <div className="relative flex-[2]">
                    <Search className="absolute left-3.5 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search tasks by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm"
                    />
                </div>

                {/* Category Filter */}
                <div className="relative flex-1">
                    <Filter className="absolute left-3.5 top-3 text-gray-400" size={18} />
                    <select
                        value={categoryFilter}
                        onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setPage(1);
                        }}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm text-gray-700 bg-white"
                    >
                        <option value="All">All Categories</option>
                        <option value="Design">Design</option>
                        <option value="Writing">Writing</option>
                        <option value="Development">Development</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <Button type="submit" className="bg-cyan-600 text-white hover:bg-cyan-700 px-6 py-2.5 rounded-xl font-medium text-sm">
                    Search
                </Button>
            </form>

            {/* Loading / Empty State */}
            {loading ? (
                <div className="py-20 text-center text-gray-500">Loading tasks...</div>
            ) : tasks.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center my-6">
                    <p className="text-gray-500 font-medium">No tasks found matching your filter criteria.</p>
                </div>
            ) : (
                /* Card Grid Layout */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-4 group"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-cyan-50 text-cyan-700 rounded-lg">
                                        {task.category || "General"}
                                    </span>
                                    <span className="flex items-center text-sm font-bold text-emerald-600">
                                        <DollarSign size={15} />{task.budget} USD
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 group-hover:text-cyan-600 transition-colors line-clamp-2">
                                    {task.title}
                                </h3>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                    {task.description}
                                </p>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 pt-1">
                                    <span className="flex items-center gap-1 bg-gray-50 px-2.5 py-1 rounded-md">
                                        <Clock size={13} /> {task.deadline || "Flexible"}
                                    </span>
                                    <span className="bg-gray-50 px-2.5 py-1 rounded-md capitalize">
                                        By: {task.client_email ? task.client_email.split('@')[0] : "Client"}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
                                <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                                    task.status === 'open' ? 'bg-emerald-50 text-emerald-700' :
                                    task.status === 'In Progress' ? 'bg-amber-50 text-amber-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {task.status}
                                </span>

                                <Link href={`/tasks/${task._id}`}>
                                    <Button className="text-xs px-4 py-1.5 bg-cyan-600 text-white hover:bg-cyan-700 rounded-xl font-medium">
                                        View Details
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-12 mb-6">
                    <Button
                        disabled={page === 1}
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1"
                    >
                        <ChevronLeft size={16} /> Previous
                    </Button>
                    <span className="text-xs font-semibold text-gray-600">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1"
                    >
                        Next <ChevronRight size={16} />
                    </Button>
                </div>
            )}
        </div>
    );
};
export default BrowseTasksPage;