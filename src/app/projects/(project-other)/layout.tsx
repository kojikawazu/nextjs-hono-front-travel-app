import React from 'react';
import ServerSideBar from '@/app/Components/layout/sidebar/server-side-bar';

/**
 * プロジェクトレイアウト
 * @param children
 * @returns JSX
 */
export default function ProjectsOtherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/5 h-full">
                <ServerSideBar />
            </div>
            <div className="w-4/5 h-full">{children}</div>
        </div>
    );
}
