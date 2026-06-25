"use client";

import { FileText, Clock, CircleCheck, CircleDollar, Briefcase } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

const STATS = [
    { title: "Total Tasks", value: "0", description: "Tasks posted", icon: FileText },
    { title: "Open Tasks", value: "0", description: "Waiting for freelancers", icon: Briefcase },
    { title: "Tasks In Progress", value: "0", description: "Currently working", icon: Clock },
    { title: "Total Spent (USD)", value: "$0", description: "From completed tasks", icon: CircleDollar },
];

export default function Freelancer() {
    return (
        <div className=" container mx-auto  bg-gray-50 p-4 md:p-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Freelancer Dashboard</h1>
                    <p className="text-gray-500 mt-1">Track your tasks and spending</p>
                </div>
                <Button className="bg-blue-900 text-white font-medium rounded-xl px-6 w-full sm:w-auto">
                    Browse Tasks
                </Button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
                {STATS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="border border-gray-200 rounded-2xl p-6 bg-white hover:shadow-lg transition-shadow duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{item.title}</p>
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">{item.value}</h2>
                                    <p className="text-xs text-gray-400 mt-1">{item.description}</p>
                                </div>
                                {/* Icon Container with Navy theme */}
                                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                    <Icon width={24} height={24} className="text-blue-900" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Tasks */}
            <div className="mt-8 md:mt-10">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Tasks</h2>
                <div className="border border-gray-200 rounded-2xl min-h-[300px] flex flex-col items-center justify-center bg-white p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                        <CircleCheck width={32} height={32} className="text-blue-900" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">No tasks yet</h3>
                    <p className="text-gray-500 mt-2 max-w-sm">Browse available tasks and start working to see your progress here.</p>
                    <Button className="mt-6 bg-blue-900 text-white rounded-xl px-8">
                        Browse Tasks
                    </Button>
                </div>
            </div>
        </div>
    );
}