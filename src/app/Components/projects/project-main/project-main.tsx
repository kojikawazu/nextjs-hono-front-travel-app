'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CONSTANTS from "@/app/utils/common-constants";
import { useProjectForm } from '@/app/hooks/projects/useProjectForm';
import ProjectCreateForm from '@/app/Components/projects/project-main/project-create/project-create-form';
import ProjectList from '@/app/Components/projects/project-main/project-list/project-list';

interface ProjectMainProps {
    userId: string | undefined,
};

/**
 * プロジェクトメイン
 * @param userId ユーザーID
 * @returns JSX
 */
const ProjectMain = ({
    userId,
}: ProjectMainProps) => {
    const router = useRouter();

    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const {
        projectList,
        isLoading,
        form,
        onCreateSubmit,
    } = useProjectForm({ 
        userId
    });

    return (
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
                        isLoading={isLoading}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProjectMain;