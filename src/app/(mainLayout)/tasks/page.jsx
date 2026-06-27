import Link from 'next/link';
import React from 'react';

const BrowseTask = () => {
    return (
        <div>
            <h1>BrowseTask</h1>
            <Link href={"/dashboard/client/tasks/mytasks"}></Link>
        </div>
    );
};

export default BrowseTask;