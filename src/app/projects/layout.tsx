import React from 'react';
import SideBar from '@/app/Components/layout/sidebar/side-bar';

export default function ProjectsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/5 h-full">
                <SideBar />
            </div>
            <div className="w-4/5 h-full">{children}</div>
        </div>
    );
}
