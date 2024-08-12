import React from 'react';
import Link from 'next/link';
import SideBarItem from '@/app/Components/layout/sidebar/atoms/side-bar-item';

/**
 * サイドバー
 * @returns JSX
 */
const SideBar = () => {
    return (
        <div className="bg-blue-300 h-screen">
            <div>
                <ul className="p-2">
                    <Link href="/projects">
                        <SideBarItem label="Projects" />
                    </Link>
                    
                    <SideBarItem label="Menu Item 2" />
                    <SideBarItem label="Menu Item 3" />
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
