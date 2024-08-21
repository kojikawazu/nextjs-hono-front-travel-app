import React from 'react';
import Link from 'next/link';
import { Project } from '@prisma/client';

import SideBarItem from '@/app/Components/layout/sidebar/atoms/side-bar-item';

interface SideBarProps {
    projectSCList: Project[];
}

/**
 * サイドバー
 * @param projectSCList プロジェクトリスト
 * @returns JSX
 */
const SideBar = ({ projectSCList }: SideBarProps) => {
    return (
        <div className="bg-blue-300 h-screen">
            <div>
                <ul className="p-2">
                    <Link href="/projects">
                        <SideBarItem label="Projects" />
                    </Link>
                    {projectSCList.map((project) => (
                        <Link href={`/projects/${project.id}`} key={project.id}>
                            <SideBarItem
                                label={project.name}
                                className="ml-2"
                            />
                        </Link>
                    ))}

                    <Link href="/projects/statistics">
                        <SideBarItem label="Project Statistics" />
                    </Link>

                    <SideBarItem label="Menu Item 2" />
                    <SideBarItem label="Menu Item 3" />
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
