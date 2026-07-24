"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Image as ImageIcon, Code, DollarSign } from "lucide-react";

export default function EditProfilePage() {
    const { data: session } = authClient.useSession();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [skills, setSkills] = useState("");
    const [bio, setBio] = useState("");
    const [hourlyRate, setHourlyRate] = useState("");
    const [saving, setSaving] = useState(false);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        if (!session?.user?.email) return;
        const fetchUserData = async () => {
            try {
                const res = await axios.get(`${baseUrl}/api/users/${session.user.email}`);
                if (res.data.user) {
                    const u = res.data.user;
                    setName(u.name || session.user.name || "");
                    setImage(u.image || session.user.image || "");
                    setSkills(Array.isArray(u.skills) ? u.skills.join(", ") : u.skills || "");
                    setBio(u.bio || "");
                    setHourlyRate(u.hourlyRate || "");
                }
            } catch (err) {
                console.error("Error loading user profile:", err);
            }
        };
        fetchUserData();
    }, [session?.user?.email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session?.user?.email) return;

        setSaving(true);
        try {
            const res = await axios.put(`${baseUrl}/api/users/profile`, {
                email: session.user.email,
                name,
                image,
                skills,
                bio,
                hourlyRate
            });

            if (res.data.success) {
                toast.success("Profile updated successfully!");
            } else {
                toast.error("Failed to update profile.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Profile update failed.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="container mx-auto p-4 md:p-8 max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">Edit Freelancer Profile</h1>
            <p className="text-gray-500 text-sm mb-8">Update your public freelancer info, skills, and rates</p>

            <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <User size={14} /> Full Name
                    </label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <ImageIcon size={14} /> Profile Picture URL
                    </label>
                    <input
                        type="url"
                        value={image}
                        placeholder="https://example.com/photo.jpg"
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <Code size={14} /> Skills (comma separated)
                    </label>
                    <input
                        type="text"
                        placeholder="React, Node.js, Tailwind CSS, Figma"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1.5">
                        <DollarSign size={14} /> Hourly Rate (USD)
                    </label>
                    <input
                        type="number"
                        placeholder="25"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-2">Bio / Overview</label>
                    <textarea
                        rows={4}
                        placeholder="Write a brief intro about your experience..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm rounded-xl transition disabled:opacity-50"
                >
                    {saving ? "Saving Changes..." : "Save Profile Changes"}
                </button>
            </form>
        </div>
    );
}
