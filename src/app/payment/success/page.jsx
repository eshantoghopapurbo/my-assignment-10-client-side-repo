"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@heroui/react";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");
    const taskId = searchParams.get("task_id");
    const proposalId = searchParams.get("proposal_id");

    const [paymentDetails, setPaymentDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";

    useEffect(() => {
        const confirmPayment = async () => {
            try {
                const res = await axios.post(`${baseUrl}/api/stripe/confirm-session`, {
                    sessionId,
                    taskId,
                    proposalId
                });
                if (res.data.payment) {
                    setPaymentDetails(res.data.payment);
                }
            } catch (err) {
                console.error("Payment confirmation error:", err);
            } finally {
                setLoading(false);
            }
        };
        confirmPayment();
    }, [sessionId, taskId, proposalId]);

    if (loading) {
        return <div className="py-20 text-center text-gray-500">Confirming payment details...</div>;
    }

    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-xl max-w-lg w-full text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={48} />
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Payment Successful!</h1>
            <p className="text-xs text-gray-500">Your Stripe transaction has been completed and task status updated to <strong>In Progress</strong>.</p>

            {paymentDetails && (
                <div className="bg-gray-50 p-6 rounded-2xl text-left space-y-3 text-xs border border-gray-100">
                    <div className="flex justify-between border-b border-gray-200/60 pb-2">
                        <span className="text-gray-500">Task Title</span>
                        <span className="font-bold text-gray-900 truncate max-w-[200px]">{paymentDetails.taskTitle}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/60 pb-2">
                        <span className="text-gray-500">Freelancer</span>
                        <span className="font-semibold text-gray-800">{paymentDetails.freelancerEmail}</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200/60 pb-2">
                        <span className="text-gray-500">Amount Paid</span>
                        <span className="font-bold text-emerald-600">${paymentDetails.amount} USD</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-500">Transaction ID</span>
                        <span className="font-mono text-[10px] text-gray-600 truncate max-w-[180px]">{paymentDetails.transactionId}</span>
                    </div>
                </div>
            )}

            <div className="pt-4">
                <Link href="/dashboard/client">
                    <Button className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold text-sm rounded-xl flex items-center justify-center gap-2">
                        Go to Dashboard <ArrowRight size={16} />
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default function PaymentSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Suspense fallback={<div className="text-gray-500">Loading...</div>}>
                <PaymentSuccessContent />
            </Suspense>
        </div>
    );
}
