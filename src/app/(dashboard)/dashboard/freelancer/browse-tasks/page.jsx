// "use client";
// import { useEffect, useState } from "react";
// import { getAllTasks } from "@/lib/actions/tasks"; // আপনার এপিআই ফাংশন
// import { Briefcase, Clock, Filter, Search } from "lucide-react";
// import Link from "next/link";
// import { Button, Spinner } from "@heroui/react";

// const BrowseTasksPage = () => {
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [categoryFilter, setCategoryFilter] = useState("All Categories");

//     useEffect(() => {
//         // সব টাস্ক ফেচ করুন
//         getAllTasks().then((data) => {
//             // শুধুমাত্র Open টাস্কগুলো সেট করুন
//             const openTasks = data.filter(t => t.status === 'Open');
//             setTasks(openTasks);
//             setLoading(false);
//         });
//     }, []);

//     // ফিল্টারিং লজিক
//     const filteredTasks = tasks.filter((task) => {
//         const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesCategory = categoryFilter === "All Categories" || task.category === categoryFilter;
//         return matchesSearch && matchesCategory;
//     });

//     if (loading) return <div className="flex justify-center p-20"><Spinner size="lg" /></div>;

//     return (
//         <div className="p-4 md:p-6">
//             <h2 className="text-2xl font-extrabold mb-6">Browse Available Tasks</h2>

//             {/* Filter Section */}
//             <div className="flex flex-col md:flex-row gap-4 mb-8">
//                 <div className="relative flex-[2]">
//                     <Search className="absolute left-3 top-3 text-gray-400" size={18} />
//                     <input
//                         type="text"
//                         placeholder="Search by title..."
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                     />
//                 </div>

//                 <div className="relative flex-1">
//                     <Filter className="absolute left-3 top-3 text-gray-400" size={18} />
//                     <select 
//                         onChange={(e) => setCategoryFilter(e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-600 appearance-none"
//                     >
//                         <option>All Categories</option>
//                         <option>Development</option>
//                         <option>Design</option>
//                         <option>Writing</option>
//                     </select>
//                 </div>
//             </div>

//             {/* Card Grid Layout */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {filteredTasks.map((task) => (
//                     <div
//                         key={task._id}
//                         className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-4 group"
//                     >
//                         <div className="space-y-3">
//                             <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
//                                 {task.title}
//                             </h3>
//                             <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
//                                 <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
//                                     <Briefcase size={13} /> {task.category}
//                                 </span>
//                                 <span className="flex items-center gap-1.5 bg-gray-50 px-2.5 py-1 rounded-md">
//                                     <Clock size={13} /> {task.deadline}
//                                 </span>
//                             </div>
//                         </div>

//                         <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
//                             <span className="text-sm font-semibold text-gray-700">
//                                 Budget: ${task.budget}
//                             </span>
//                             <Button
//                                 variant="outline"
//                                 className="text-xs h-8 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all rounded-lg"
//                             >
//                                 <Link href={`/dashboard/freelancer/task-details/${task._id}`}>View Details</Link>
//                             </Button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BrowseTasksPage;

"use client";
import { useEffect, useState } from "react";
import { Briefcase, Clock, Filter, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { getallTasks } from "@/lib/actions/tasks";

const BrowseTasksPage = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");

    useEffect(() => {
        // সব টাস্ক ফেচ করার জন্য
        getallTasks().then((data) => setTasks(data));
    }, []);

    // সার্চ এবং ক্যাটাগরি ফিল্টারিং লজিক
    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === "All Categories" || task.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="p-4 md:p-6">
            <h2 className="text-2xl font-extrabold mb-6">Browse Available Tasks</h2>

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
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-600 appearance-none bg-white"
                    >
                        <option>All Categories</option>
                        <option>Development</option>
                        <option>Design</option>
                        <option>Writing</option>
                    </select>
                </div>
            </div>

            {/* Card Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                    <div
                        key={task._id}
                        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between gap-4 group"
                    >
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

                        <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
                            <span className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider">
                                {task.status}
                            </span>

                            <Button
                                variant="outline"
                                className="text-xs h-8 border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all rounded-lg"
                            >
                                {/* খেয়াল করুন এখানে লিংকটি ব্রাউজ রাউটের জন্য সেট করবেন */}
                                <Link href={`/tasks/${task._id}`}>View Details</Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrowseTasksPage;