import React from 'react';
import SideBar from '@/app/Components/layout/sidebar/side-bar';

export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <div className="w-1/5">
                <SideBar />
            </div>
            <div className="w-4/5">{children}</div>
        </div>
    );
}
