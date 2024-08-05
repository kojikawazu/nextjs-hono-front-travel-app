import React from 'react';

interface SideBarItemProps {
    label: string;
}

/**
 * サイドバーアイテム
 * @param label
 * @returns JSX
 */
const SideBarItem = ({ label }: SideBarItemProps) => {
    return <li className="p-2 border-b border-blue-400">{label}</li>;
};

export default SideBarItem;
