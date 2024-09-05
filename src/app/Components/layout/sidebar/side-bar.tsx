'use client';
import React from 'react';
import Link from 'next/link';
import { Project } from '@prisma/client';
import {
    BarChart2,
    Calendar,
    FolderOpen,
    LayoutDashboard,
    PieChart,
} from 'lucide-react';

import CollapsibleSection from '@/app/Components/layout/sidebar/atoms/collapsible-section';
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
        <div className="bg-blue-600 h-screen w-64 text-white overflow-y-auto shadow-lg">
            <div className="p-4">
                <nav>
                    <Link href="/projects">
                        <SideBarItem
                            label="全プロジェクト"
                            icon={<FolderOpen size={20} />}
                            className="mb-2"
                        />
                    </Link>

                    <CollapsibleSection
                        label="プロジェクト"
                        icon={<LayoutDashboard size={20} />}
                    >
                        {projectSCList.map((project) => (
                            <Link
                                href={`/projects/${project.id}`}
                                key={project.id}
                            >
                                <SideBarItem
                                    label={project.name}
                                    className="pl-8 py-2 text-sm"
                                />
                            </Link>
                        ))}
                    </CollapsibleSection>

                    <Link href="/projects/statistics">
                        <SideBarItem
                            label="全プロジェクト統計"
                            icon={<PieChart size={20} />}
                            className="mb-2"
                        />
                    </Link>

                    <CollapsibleSection
                        label="プロジェクト統計"
                        icon={<BarChart2 size={20} />}
                    >
                        {projectStatisticsSCList.map((project) => (
                            <Link
                                href={`/projects/statistics/${project.id}`}
                                key={project.id}
                            >
                                <SideBarItem
                                    label={project.name}
                                    className="pl-8 py-2 text-sm"
                                />
                            </Link>
                        ))}
                    </CollapsibleSection>

                    <Link href="/projects/calendar">
                        <SideBarItem
                            label="カレンダー"
                            icon={<Calendar size={20} />}
                        />
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default SideBar;
