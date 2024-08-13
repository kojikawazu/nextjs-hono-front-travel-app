'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@prisma/client';

import CONSTANTS from '@/app/utils/common-constants';
import { useProjectForm } from '@/app/hooks/projects/useProjectForm';

import SideBar from '@/app/Components/layout/sidebar/side-bar';
import ProjectCreateForm from '@/app/Components/projects/project-main/project-create/project-create-form';
import ProjectList from '@/app/Components/projects/project-main/project-list/project-list';

interface ProjectMainProps {
    userId: string | undefined;
    projectSCList: Project[];
}

/**
 * プロジェクトメイン
 * @param userId ユーザーID
 * @param projectSCList プロジェクトリスト
 * @returns JSX
 */
const ProjectMain = ({ userId, projectSCList }: ProjectMainProps) => {
    const router = useRouter();

    if (userId === undefined || projectSCList === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const { projectList, form, onCreateSubmit } = useProjectForm({
        userId,
        projectSCList,
    });

    return (
        <div className="flex h-screen overflow-hidden">
            <div className="w-1/5 h-full">
                <SideBar projectSCList={projectList} />
            </div>
            <div className="w-4/5 h-full">
                <div className="flex flex-col h-full p-6 space-y-6">
                    <div className="bg-white rounded-lg shadow p-4">
                        <ProjectCreateForm
                            form={form}
                            onCreateSubmit={onCreateSubmit}
                        />
                    </div>

                    <div className="flex-grow bg-white rounded-lg shadow overflow-hidden">
                        <div className="h-full">
                            <ProjectList
                                projectList={projectList}
                                isLoading={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectMain;
