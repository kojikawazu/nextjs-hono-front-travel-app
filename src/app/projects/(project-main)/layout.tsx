import React from 'react';

/**
 * プロジェクトメインレイアウト
 * @param children
 * @returns JSX
 */
export default function ProjectsMainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <div className="">{children}</div>;
}
