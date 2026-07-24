import { authClient } from "../auth-client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

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

export const getTaskDetails = async (id) => {
  if (!id) throw new Error("Task ID is missing");

  const res = await fetch(`${baseUrl}/task/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  return res.json();
};

export const getProposalDetails = async (proposalId) => {
  const res = await fetch(`${baseUrl}/api/proposals/details/${proposalId}`, { cache: 'no-store' });
  return res.json();
};

// get my tasks
export const getMyTasks = async (email) => {
  const res = await fetch(`${baseUrl}/mytask?email=${email}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// get open tasks
export const getopenTasks = async () => {
  const res = await fetch(`${baseUrl}/opentask`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

// get all tasks with pagination, search, category
export const getallTasks = async (page = 1, limit = 9, search = "", category = "All") => {
  let url = `${baseUrl}/task?page=${page}&limit=${limit}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;
  if (category && category !== "All" && category !== "All Categories") {
    url += `&category=${encodeURIComponent(category)}`;
  }
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};