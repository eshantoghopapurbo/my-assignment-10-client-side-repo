

import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createTask = async (newTaskData) => {
  try {

    const res = await fetch(`${baseUrl}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify(newTaskData),
    });

    if (!res.ok) {
      throw new Error("Failed to create task");
    }

    return await res.json();
  } catch (error) {
    console.error("Error in createTask API call:", error);
    throw error;
  }
};

// lib/api/tasks.js
export const getTaskDetails = async (id) => {
  // id না থাকলে আগেই রিটার্ন করে দিন
  if (!id) throw new Error("Task ID is missing");
  // এখানে baseUrl ভেরিয়েবলটি ব্যবহার করুন
  const res = await fetch(`${baseUrl}/api/tasks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: 'no-store',
  });
  // if (!res.ok) {
  //   // এরর হ্যান্ডলিং আরও স্পষ্ট করার জন্য
  //   const errorData = await res.json().catch(() => ({}));
  //   console.error("API Response Error:", errorData);
  //   throw new Error(`Failed to fetch task details: ${res.status}`);
  // }
  return res.json();
};

// export const getProposalDetails = async (proposalId) => {
//   const res = await fetch(`${baseUrl}/api/proposals/details/${proposalId}`, { cache: 'no-store' });
//   return res.json();
// };

// get my task

export const getMyTasks = async (email) => {
  const res = await fetch(`${baseUrl}/mytask?email=${email}`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// get open task 

export const getopenTasks = async () => {
  const res = await fetch(`${baseUrl}/opentask`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// get inprogrestask task 

export const inprogrestaskTasks = async () => {
  const res = await fetch(`${baseUrl}/inprogrestask`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// get all task 
export const getallTasks = async () => {
  const res = await fetch(`${baseUrl}/task`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
 
// GET PROPOSALD
export const getProposalDetails = async (proposalId) => {
  const res = await fetch(`${baseUrl}/api/proposals/details/${proposalId}`, { cache: 'no-store' });
  return res.json();
};

          