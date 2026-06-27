"use client";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client"; // আপনার অথেন্টিকেশন ক্লায়েন্ট
import { Card, Input, Textarea, Button, Spinner } from "@heroui/react";
import { getTaskDetails } from "@/lib/actions/tasks";
import { submitProposal } from "@/lib/actions/actions";

 export const TaskDetailsPage = ({ params }) => {
    const { id } = params; // Task ID
    const { data: session } = authClient.useSession();
    const [task, setTask] = useState(null);
    const [hasApplied, setHasApplied] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const taskData = await getTaskDetails(id);
            setTask(taskData);
            
            // চেক করা ইউজার আগে এপ্লাই করেছে কিনা
            if (session?.user?.email) {
                const applied = await checkExistingProposal(id, session.user.email);
                setHasApplied(applied);
            }
            setLoading(false);
        };
        loadData();
    }, [id, session]);

    const handleProposalSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            taskId: id,
            freelancerEmail: session.user.email,
            proposedBudget: e.target.budget.value,
            estimatedDays: e.target.days.value,
            coverNote: e.target.note.value,
        };

        const result = await submitProposal(formData);
        if (result.success) {
            alert("Proposal submitted successfully!");
            setHasApplied(true); // ফর্ম হাইড করার জন্য
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
            {/* টাস্কের ডিটেইলস */}
            <div className="md:col-span-2">
                <h1 className="text-3xl font-bold">{task?.title}</h1>
                <p className="mt-4 text-gray-600">{task?.description}</p>
                {/* আরও ডিটেইলস */}
            </div>

            {/* প্রপোজাল ফর্ম */}
            <div className="md:col-span-1">
                {hasApplied ? (
                    <Card className="p-6 bg-green-50">
                        <h3 className="text-green-700 font-bold">You have already applied!</h3>
                    </Card>
                ) : (
                    <form onSubmit={handleProposalSubmit} className="space-y-4">
                        <Input name="budget" label="Proposed Budget (USD)" type="number" required />
                        <Input name="days" label="Estimated Days" type="number" required />
                        <Textarea name="note" label="Cover Note" required />
                        <Button type="submit" color="primary" fullWidth>Submit Proposal</Button>
                    </form>
                )}
            </div>
        </div>
    );
};