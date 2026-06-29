'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { authClient } from '@/lib/auth-client';

const MyProposalsTable = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // session থেকে user এর তথ্য আনা
  const { data: session } = authClient.useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    // ইমেইল না থাকলে রিকোয়েস্ট পাঠাবে না
    if (!userEmail) {
      setLoading(false); 
      return;
    }

    axios.get(`http://localhost:5000/api/my-proposals?email=${userEmail}`)
      .then(res => {
        setProposals(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching proposals:", err);
        setLoading(false);
      });
  }, [userEmail]); // userEmail পাওয়া মাত্রই কল হবে

  if (loading) return <p>Loading...</p>;
  
  // যদি কোনো ডাটা না থাকে
  if (proposals.length === 0) return <p>You haven't submitted any proposals yet.</p>;

  return (
    <div className="overflow-x-auto p-5">
      <table className="table w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Task Title</th>
            <th>Proposed Budget</th>
            <th>Estimated Days</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((item) => (
            <tr key={item.proposalId} className="border-b">
              <td>{item.taskTitle}</td>
              <td>${item.proposedBudget}</td>
              <td>{item.estimatedDays} days</td>
              <td>
                <span className={`badge ${item.status === 'accepted' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                  {item.status}
                </span>
              </td>
              <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyProposalsTable;