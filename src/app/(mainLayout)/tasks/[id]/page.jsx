'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import Link from 'next/link';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/task/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchTask();
  }, [id]);

  const handleSubmitProposal = async (e) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.error("Please login to submit a proposal!");
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const proposalData = Object.fromEntries(formData.entries());

    const finalData = {
      taskId: id,
      freelancerEmail: session.user.email,
      proposedBudget: Number(proposalData.proposedBudget),
      estimatedDays: Number(proposalData.estimatedDays),
      coverNote: proposalData.coverNote
    };

    setSubmitting(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000'}/api/proposals`, finalData);
      if (response.data.success) {
        toast.success("Proposal submitted successfully!");
        form.reset();
      } else {
        toast.error(response.data.message || "Failed to submit proposal.");
      }
    } catch (error) {
      console.error("Error submitting proposal:", error);
      const msg = error.response?.data?.message || "Failed to submit proposal. You may have already applied.";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading task details...</div>;
  if (!task) return <div className="p-10 text-center text-gray-500">Task not found!</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8 bg-white min-h-screen">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600">{task.category || 'General'}</span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            task.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
          }`}>{task.status}</span>
        </div>
        <Link href="/tasks" className="text-xs font-medium text-cyan-600 hover:underline">
          &larr; Back to tasks
        </Link>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-8">{task.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white">
            <h2 className="text-lg font-bold text-gray-900 mb-3">Task Description</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm">{task.description}</p>
          </div>

          {/* Proposal Form */}
          {task.status === 'open' ? (
            <form onSubmit={handleSubmitProposal} className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <span>✈️</span> Submit a Proposal
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Proposed Budget (USD)</label>
                  <input name="proposedBudget" type="number" step="any" required placeholder="e.g. 50" className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-2">Estimated Days</label>
                  <input name="estimatedDays" type="number" required placeholder="e.g. 3" className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Cover Note</label>
                <textarea name="coverNote" required placeholder="Explain your experience and approach to complete this task..." className="w-full p-3 text-sm bg-gray-50 border border-gray-200 rounded-xl h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" />
              </div>

              <button disabled={submitting} type="submit" className="w-full py-3 bg-cyan-600 text-white font-semibold text-sm rounded-xl hover:bg-cyan-700 transition duration-200 disabled:opacity-50">
                {submitting ? "Submitting..." : "Submit Proposal"}
              </button>
            </form>
          ) : (
            <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl text-center text-sm text-gray-500 font-medium">
              This task is currently {task.status} and no longer accepting proposals.
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="p-6 border border-gray-100 rounded-2xl shadow-sm bg-white h-fit space-y-5">
          <InfoItem icon="💰" label="Budget" value={`$${task.budget} USD`} valueColor="text-emerald-600" />
          <InfoItem icon="📅" label="Deadline" value={task.deadline || "Flexible"} />
          <InfoItem icon="🕒" label="Posted Date" value={task.createdAt ? new Date(task.createdAt).toLocaleDateString() : "Recently"} />
          <InfoItem icon="👤" label="Client Email" value={task.client_email || "Anonymous"} />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, valueColor = "text-gray-900" }) => (
  <div className="flex items-start gap-3">
    <span className="text-xl">{icon}</span>
    <div>
      <p className="text-xs text-gray-400 font-medium">{label}</p>
      <p className={`font-bold text-sm ${valueColor}`}>{value}</p>
    </div>
  </div>
);

export default TaskDetails;