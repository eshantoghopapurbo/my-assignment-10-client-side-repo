import Link from 'next/link';
import React from 'react';
import DashboardSideBar from '@/components/DashboardSideBar';

const DashboardLayout = ({ children }) => {
    return (
        <div className='min-h-screen flex flex-col md:flex-row bg-white'>
            <div className='w-full md:w-64 md:h-screen border-b md:border-r flex flex-row md:flex-col items-center md:items-start p-4 md:p-0'>
                <Link href="/" className="font-extrabold text-2xl md:text-3xl text-blue-600 tracking-tight md:mx-5 md:my-5">
                    SkillSwap
                </Link>

                {/* মোবাইলে মেনুগুলো হরিজন্টাল থাকবে, ডেস্কটপে ভার্টিক্যাল */}
                <div className="md:w-full ">
                    <DashboardSideBar />
                </div>
            </div>

            {/* মূল কন্টেন্ট */}
            <div className='flex-1 px-4 py-6 md:px-6 md:py-10 container mx-auto'>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;