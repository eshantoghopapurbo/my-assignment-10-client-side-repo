
import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { Card,  Button } from "@heroui/react";
import Link from 'next/link';
import { submitProposal } from '@/lib/actions/actions';

export default async function Success({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const { session_id } = resolvedSearchParams;

  if (!session_id) {
    throw new Error('Please provide a valid session_id');
  }

  const session  = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });
  
  const metadata = session.metadata;
  const customerEmail = session.customer_details?.email;
  const proposals = await submitProposal();
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 shadow-2xl">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-400">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
             </svg>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Payment Successful!</h1>
            <p className="text-zinc-400">
              Your purchase is confirmed. A receipt has been sent to <br/>
              <span className="text-black font-semibold">{customerEmail}</span>
            </p>
          </div>

          <div className="w-full mt-4">
            <Link
              href="/dashboard" 
              className="bg-white text-black font-bold px-5"
              size="lg"
            >
              Go to Dashboard
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}