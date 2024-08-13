import React from 'react';

export default function TestLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex">
            <div className="w-4/5">{children}</div>
        </div>
    );
}
