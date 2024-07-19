'use client';

import { useRouter } from 'next/navigation';
import CONSTANTS from "@/app/utils/common-constants";
import { useProjectDetail } from '@/app/hooks/projects/useProjectDetail';
import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';

interface ProjectDetailProps {
    projectId: string;
    userId: string | undefined;
};

/**
 * プロジェクト詳細
 * @param projectId
 * @param userId
 * @returns JSX
 */
const ProjectDetail = ({
    projectId,
    userId,
}: ProjectDetailProps) => {
    const router = useRouter();

    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const {
        project,
        isLoading,
    } = useProjectDetail({ 
        projectId: projectId,
    });

    return (
        <>
            <div className="p-2 border border-pink-200">
                <ProjectTitle title={project?.name ?? 'Non Title'} />
            </div>

            <div className="flex-grow overflow-hidden">
                <div className="flex flex-col h-full p-6 space-y-6">
                    <div className="flex-grow bg-white rounded-lg shadow overflow-hidden">
                        <div className="h-full">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <div className="text-2xl font-bold text-gray-400">Loading...</div>
                                </div>
                            ) : (
                                <div className="p-6">
                                    <div className="text-2xl font-bold text-gray-800">{project?.name}</div>
                                    <div className="text-sm text-gray-400">{project?.description}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default ProjectDetail;