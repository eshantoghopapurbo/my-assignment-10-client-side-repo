"use client";

import { useEffect, useState } from "react";
import { FileText, Clock, CircleCheck, CircleDollar, Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import axios from "axios";

export default function ClientDashboard() {
  const { data: session } = authClient.useSession();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    if (!session?.user?.email) return;
    axios.get(`${baseUrl}/mytask?email=${session.user.email}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTasks(res.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [session?.user?.email]);

  const totalTasks = tasks.length;
  const openTasks = tasks.filter(t => t.status === "open").length;
  const inProgressTasks = tasks.filter(t => t.status === "In Progress").length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;

  const STATS = [
    { title: "Total Tasks", value: `${totalTasks}`, description: "All tasks created by you", icon: FileText },
    { title: "Open Tasks", value: `${openTasks}`, description: "Awaiting freelancer proposals", icon: Clock },
    { title: "In Progress", value: `${inProgressTasks}`, description: "Currently assigned", icon: CircleCheck },
    { title: "Completed Tasks", value: `${completedTasks}`, description: "Finished micro-tasks", icon: CircleDollar },
  ];

  return (
    <div className="container mx-auto bg-gray-50 p-4 md:p-8 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Client Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your task postings and hire top talent</p>
        </div>
        <Link href="/dashboard/client/tasks/post-task">
          <Button
            startContent={<Plus width={18} height={18} />}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-xl px-6 w-full sm:w-auto text-sm"
          >
            Post New Task
          </Button>
        </Link>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {STATS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="border border-gray-100 rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-semibold text-gray-500">{item.title}</p>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mt-2">{item.value}</h2>
                  <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0">
                  <Icon width={24} height={24} className="text-cyan-700" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Tasks */}
      <div className="mt-8 md:mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">My Posted Tasks</h2>
          <Link href="/dashboard/client/tasks/mytasks" className="text-xs font-semibold text-cyan-600 hover:underline">
            View All &rarr;
          </Link>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          {tasks.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-base font-bold text-gray-900">No tasks posted yet</h3>
              <p className="text-gray-500 text-xs mt-1">Post your first micro-task to start hiring freelancers.</p>
              <Link href="/dashboard/client/tasks/post-task">
                <Button className="mt-4 bg-cyan-600 text-white rounded-xl px-6 text-sm">Post a Task</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.slice(0, 5).map((t) => (
                <div key={t._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-50 rounded-xl bg-gray-50/50 gap-2">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{t.title}</h4>
                    <p className="text-xs text-gray-500">{t.category} &bull; Deadline: {t.deadline || 'Flexible'}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-emerald-600">${t.budget} USD</span>
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${
                      t.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>{t.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}