


'use client'
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { processPayment } from '@/lib/actions/actions';
import { toast, Toaster } from 'sonner'; // Toast কাজ করার জন্য এটি প্রয়োজন

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    

    const taskTitle = searchParams.get('taskTitle') || "Task Title";
    const freelancerEmail = searchParams.get('freelancerEmail');
    const amount = searchParams.get('amount');
    const taskId = searchParams.get('taskId'); 
    const proposalId = searchParams.get('proposalId');

    const handlePay = async () => {
        const paymentData = {
            sessionId: "dummy_session_" + Date.now(),
            taskId: taskId,
            proposalId: proposalId,
            userEmail: freelancerEmail,
            price: amount,
        };

        const result = await processPayment(paymentData);

        if (result.success) {
            // Toast সফল মেসেজ
            toast.success("Payment successful! Task status updated.");
           router.push(`/dashboard/client/payment/success?taskTitle=${taskTitle}&freelancerEmail=${freelancerEmail}&amount=${amount}`);
        } else {
            // Toast এরর মেসেজ
            toast.error("Payment failed: " + result.message);
        }
    };

    return (
        // flex-col (মোবাইলের জন্য নিচে নিচে) এবং md:flex-row (ল্যাপটপের জন্য পাশাপাশি) করা হয়েছে
        <div className="max-w-6xl mx-auto p-4 md:p-10 flex flex-col md:flex-row gap-6 md:gap-12">
            <Toaster richColors /> {/* টাইপো ঠিক করা হয়েছে */}

            {/* বাম পাশ: ডিটেইলস (মোবাইলে w-full, ল্যাপটপে w-1/3) */}
            <div className="w-full md:w-1/3">
                <h1 className="font-bold text-xl mb-4 md:mb-6">TaskHive</h1>
                <p className="text-gray-500 mb-4 md:mb-6">Secure Checkout</p>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">${amount}</h2>
                <p className="text-gray-500 mb-6 md:mb-8">Total due today</p>

                <div className="border rounded-xl p-4 md:p-6 space-y-4">
                    <div className="flex justify-between items-center gap-4">
                        <span>Task</span>
                        <span className="font-semibold text-right">{taskTitle}</span>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <span>Freelancer</span>
                        <span className="font-semibold text-right truncate">{freelancerEmail}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span>Amount</span>
                        <span className="font-semibold">${amount}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${amount}</span>
                    </div>
                </div>
            </div>

            {/* ডান পাশ: পেমেন্ট ফর্ম (মোবাইলে w-full, ল্যাপটপে w-2/3) */}
            <div className="w-full md:w-2/3 border rounded-xl p-5 md:p-8 shadow-sm">
                <h2 className="text-lg font-bold mb-4 md:mb-6">Payment Details</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="name" className="w-full p-3 border rounded" />
                    <input type="text" placeholder="4242 4242 4242 4242" className="w-full p-3 border rounded" />
                    <div className="flex gap-4">
                        <input type="text" placeholder="12/28" className="w-1/2 p-3 border rounded" />
                        <input type="text" placeholder="123" className="w-1/2 p-3 border rounded" />
                    </div>
                    <button onClick={handlePay} className="w-full bg-blue-500 text-white p-4 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                        Pay ${amount}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}