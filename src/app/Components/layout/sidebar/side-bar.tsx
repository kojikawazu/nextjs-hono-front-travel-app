import React from 'react';
import Link from 'next/link';
import { Project } from '@prisma/client';

import SideBarItem from '@/app/Components/layout/sidebar/atoms/side-bar-item';

interface SideBarProps {
    projectSCList: Project[];
    projectStatisticsSCList: Project[];
}

/**
 * サイドバー
 * @param projectSCList プロジェクトリスト
 * @param projectStatisticsSCList プロジェクト統計リスト
 * @returns JSX
 */
const SideBar = ({ projectSCList, projectStatisticsSCList }: SideBarProps) => {
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
                    {projectStatisticsSCList.map((project) => (
                        <Link
                            href={`/projects/statistics/${project.id}`}
                            key={project.id}
                        >
                            <SideBarItem
                                label={project.name}
                                className="ml-2"
                            />
                        </Link>
                    ))}

                    <Link href="/projects/calendar">
                        <SideBarItem label="Project Calendar" />
                    </Link>

                    <SideBarItem label="Menu Item 2" />
                    <SideBarItem label="Menu Item 3" />
                </ul>
            </div>
        </div>
    );
};

export default SideBar;
