import React, { ReactNode } from 'react';

interface SideBarItemProps {
    label: string;
    icon?: ReactNode;
    className?: string;
}

/**
 * サイドバーアイテム
 * @param label
 * @param icon
 * @param className
 * @returns JSX
 */
const SideBarItem = ({ label, icon, className = '' }: SideBarItemProps) => {
    return (
        <div
            data-testid="sidebar-item"
            className={`flex items-center space-x-2 p-2 hover:bg-blue-400 cursor-pointer transition-all duration-200 ${className}`}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            <span className="flex-grow">{label}</span>
        </div>
    );
};

export default SideBarItem;
