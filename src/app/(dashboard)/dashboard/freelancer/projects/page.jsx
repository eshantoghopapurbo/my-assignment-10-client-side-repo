"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Briefcase, ExternalLink, CheckCircle, Clock } from "lucide-react";

export default function ActiveProjectsPage() {
    const { data: session } = authClient.useSession();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState(null);
    const [deliverableUrl, setDeliverableUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    const fetchProjects = async () => {
        if (!session?.user?.email) return;
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}/api/freelancer/active-projects?freelancerEmail=${session.user.email}`);
            if (res.data.projects) {
                setProjects(res.data.projects);
            }
        } catch (err) {
            console.error("Error fetching active projects:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [session?.user?.email]);

    const handleDeliverableSubmit = async (e) => {
        e.preventDefault();
        if (!deliverableUrl || !selectedTask) return;

        setSubmitting(true);
        try {
            const res = await axios.put(`${baseUrl}/api/tasks/${selectedTask._id}/deliverable`, {
                deliverable_url: deliverableUrl
            });

            if (res.data.success) {
                toast.success("Deliverable submitted and project marked as Completed!");
                setSelectedTask(null);
                setDeliverableUrl("");
                fetchProjects();
            } else {
                toast.error("Failed to submit deliverable.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to submit deliverable.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">Loading active projects...</div>;

    return (
        <div className="container mx-auto p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Active & Completed Projects</h1>
            <p className="text-gray-500 text-sm mb-8">Track work in progress and submit final project deliverables</p>

            {projects.length === 0 ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-500">
                    No active or completed projects found yet.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {projects.map((task) => (
                        <div key={task._id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-4">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-xs font-semibold px-2.5 py-1 bg-cyan-50 text-cyan-700 rounded-lg">
                                        {task.category || "Task"}
                                    </span>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                                        task.status === "Completed" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                                    }`}>
                                        {task.status}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg text-gray-900 mb-2">{task.title}</h3>
                                <p className="text-xs text-gray-500 line-clamp-2 mb-4">{task.description}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <span>Budget: <strong className="text-gray-900">${task.budget} USD</strong></span>
                                    <span>Client: <strong>{task.client_email ? task.client_email.split('@')[0] : 'Client'}</strong></span>
                                </div>
                            </div>

                            {task.status === "In Progress" ? (
                                <button
                                    onClick={() => setSelectedTask(task)}
                                    className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs rounded-xl transition flex items-center justify-center gap-2"
                                >
                                    <CheckCircle size={15} /> Submit Deliverable
                                </button>
                            ) : (
                                task.deliverable_url && (
                                    <a
                                        href={task.deliverable_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-medium text-xs rounded-xl transition flex items-center justify-center gap-2"
                                    >
                                        <ExternalLink size={14} /> View Submitted Deliverable
                                    </a>
                                )
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Deliverable Submission Modal */}
            {selectedTask && (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-xl space-y-4">
                        <h2 className="text-xl font-bold text-gray-900">Submit Deliverable</h2>
                        <p className="text-xs text-gray-500">Provide the public URL to your work (e.g. GitHub link, Google Drive document, Figma design)</p>
                        
                        <form onSubmit={handleDeliverableSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Deliverable URL</label>
                                <input
                                    type="url"
                                    required
                                    placeholder="https://github.com/username/project"
                                    value={deliverableUrl}
                                    onChange={(e) => setDeliverableUrl(e.target.value)}
                                    className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setSelectedTask(null)}
                                    className="px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="px-5 py-2 text-xs font-semibold bg-cyan-600 text-white hover:bg-cyan-700 rounded-xl disabled:opacity-50"
                                >
                                    {submitting ? "Submitting..." : "Submit & Mark Completed"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}