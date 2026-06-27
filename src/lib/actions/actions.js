
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateTask = async (id, taskData) => {
  try {
    const response = await fetch(
      `${baseUrl}/mytasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      }
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Update fetch error:", error);
    return { success: false, message: "Network error" };
  }
};

// delete tasks
export const deleteTask = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/api/tasks/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (!response.ok) {
      // যদি সার্ভার থেকে এরর আসে (যেমন: status 403 বা 404)
      return { success: false, message: data.message || "Failed to delete" };
    }
    return data;
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, message: "Server error" };
  }
};


// // প্রপোজাল রেজেক্ট করার সার্ভার অ্যাকশন
// export const rejectProposalAction = async (taskId, proposalId) => {
//   try {
//     // তোমার ব্যাকএন্ড API-তে PUT রিকোয়েস্ট পাঠানো হচ্ছে
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/proposals/${taskId}/${proposalId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           "Accept": "application/json",
//         },
//         body: JSON.stringify({ status: "Rejected" }),
//       }
//     );

//     const result = await response.json();

//     if (response.ok && result.success) {
//       return { success: true, message: "Proposal rejected successfully" };
//     } else {
//       return { success: false, message: result.message || "Failed to reject proposal" };
//     }
//   } catch (error) {
//     console.error("Error in rejectProposalAction:", error);
//     return { success: false, message: "Network error, please try again." };
//   }
// };


// // ফ্রিল্যান্সারের সব প্রপোজাল নিয়ে আসার সার্ভার অ্যাকশন
// export const getFreelancerProposals = async (email) => {
//   try {
//     // Better Auth থেকে টোকেন নেওয়া হচ্ছে
//     const { data: tokenData } = await authClient.token();

//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/my-proposals?email=${email}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         // Authorization হেডারে Bearer টোকেন পাস করা হলো
//         authorization: `Bearer ${tokenData?.token}`,
//       },
//       cache: "no-store" // রিয়েল-টাইম স্ট্যাটাস আপডেটের জন্য ক্যাশিং অফ রাখা হলো
//     });
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error in getFreelancerProposals:", error);
//     return [];
//   }
// };

// // একটি নির্দিষ্ট প্রপোজালের ডিটেইলস নিয়ে আসার সার্ভার অ্যাকশন
// export const getProposalDetails = async (proposalId) => {
//   try {
//     // Better Auth থেকে টোকেন নেওয়া হচ্ছে
//     const { data: tokenData } = await authClient.token();

//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/proposals/details/${proposalId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization হেডারে Bearer টোকেন পাস করা হলো
//           authorization: `Bearer ${tokenData?.token}`,
//         },
//         cache: "no-store",
//       }
//     );
//     const result = await response.json();

//     // ব্যাকএন্ড যদি success: true দেয়, তবে তার ভেতরের data অবজেক্টটি পাঠাবো
//     if (result && result.success) {
//       return result.data;
//     }
//     return null;
//   } catch (error) {
//     console.error("Error in getProposalDetailsAction:", error);
//     return null;
//   }
// };

