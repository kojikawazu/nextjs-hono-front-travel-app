import React from 'react';
import ServerSideBar from '@/app/Components/layout/sidebar/server-side-bar';

/**
 * プロジェクトレイアウト(その他)
 * @param children
 * @returns JSX
 */
export default function ProjectsOtherLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <aside className="w-64 bg-white shadow-md overflow-y-auto">
                <ServerSideBar />
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                {children}
            </main>
        </div>
    );
}
