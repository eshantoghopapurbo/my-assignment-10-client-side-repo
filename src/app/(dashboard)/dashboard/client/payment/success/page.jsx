'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // URL থেকে ডাটাগুলো নিয়ে আসছি
    const taskTitle = searchParams.get('taskTitle');
    const freelancerEmail = searchParams.get('freelancerEmail');
    const amount = searchParams.get('amount') || "0";

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
            {/* এখানে একটি সবুজ টিক আইকন বসাতে পারো */}
            <div className="bg-green-100 p-4 rounded-full mb-6">
                <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>

            <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-500 mb-8">Your transaction has been confirmed</p>

            {/* কার্ড ডিজাইন */}
            <div className="border rounded-2xl p-6 w-full max-w-sm shadow-sm mb-8 text-left">
                <div className="flex justify-between mb-4"><span>Task</span> <span className="font-semibold">{taskTitle}</span></div>
                <div className="flex justify-between mb-4"><span>Freelancer</span> <span className="font-semibold">{freelancerEmail}</span></div>
                <div className="flex justify-between"><span>Amount Paid</span> <span className="font-semibold text-green-600 text-lg">${amount}</span></div>
            </div>

            <button onClick={() => router.push('/dashboard/client')} className="w-full max-w-sm bg-blue-500 text-white p-4 rounded-xl font-bold">
                Go to Dashboard →
            </button>
        </div>
    );
}

export default function SuccessPage() {
    return <Suspense fallback={<div>Loading...</div>}><SuccessContent /></Suspense>;
}