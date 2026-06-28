'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // সেশন হুকটি কম্পোনেন্টের উপরে রাখা হয়েছে
  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/task/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
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
      ...proposalData,
      taskId: id,
      freelancerEmail: session.user.email,
      status: "Pending",
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/new-proposal`, finalData);
      if (response.data.success) {
        toast.success("Proposal submitted successfully!");
        form.reset();
      }
    } catch (error) {
      console.error("Error submitting proposal:", error);
      toast.error("Failed to submit proposal. Please try again.");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!task) return <div className="p-10 text-center">Task not found!</div>;

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white">
      {/* Badge Section */}
      <div className="flex gap-2 mb-4">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">{task.category || 'General'}</span>
        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">{task.status}</span>
      </div>
      
      <h1 className="text-3xl font-bold mb-8">{task.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="p-6 border border-gray-100 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">{task.description}</p>
          </div>

          {/* Proposal Form */}
          <form onSubmit={handleSubmitProposal} className="p-6 border border-gray-100 rounded-xl shadow-sm bg-white">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <span className="text-orange-500">✈️</span> Submit a Proposal
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Proposed Budget (USD)</label>
                <input name="proposedBudget" type="number" required placeholder="e.g. 50.00" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Days</label>
                <input name="estimatedDays" type="number" required placeholder="e.g. 6" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Cover Note</label>
              <textarea name="coverNote" required placeholder="Explain why you're the best fit for this task..." className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none" />
            </div>

            <button type="submit" className="w-full py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition duration-200">
              Submit Proposal
            </button>
          </form>
        </div>

        {/* Sidebar Info */}
        <div className="p-6 border border-gray-100 rounded-xl shadow-sm h-fit space-y-6">
          <InfoItem icon="💰" label="Budget" value={`$${task.budget}`} valueColor="text-orange-500" />
          <InfoItem icon="📅" label="Deadline" value={new Date(task.deadline).toLocaleDateString()} />
          <InfoItem icon="🕒" label="Posted" value={new Date(task.createdAt).toLocaleDateString()} />
          <InfoItem icon="👤" label="Client" value={task.client_email} />
        </div>
      </div>
    </div>
  );
};

// Helper Component
const InfoItem = ({ icon, label, value, valueColor = "text-gray-900" }) => (
  <div className="flex items-start gap-3">
    <span className="text-xl">{icon}</span>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-semibold ${valueColor}`}>{value}</p>
    </div>
  </div>
);

export default TaskDetails;