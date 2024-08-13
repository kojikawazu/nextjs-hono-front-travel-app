import React from 'react';

interface SideBarItemProps {
    label: string;
    className?: string;
}

/**
 * サイドバーアイテム
 * @param label
 * @param className
 * @returns JSX
 */
const SideBarItem = ({ label, className = '' }: SideBarItemProps) => {
    return (
        <li className={`p-2 border-b border-blue-400 ${className}`}>{label}</li>
    );
};

export default SideBarItem;
