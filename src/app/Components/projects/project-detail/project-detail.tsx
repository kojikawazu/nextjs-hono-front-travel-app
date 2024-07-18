'use client';

import { useRouter } from 'next/navigation';
import CONSTANTS from "@/app/utils/common-constants";
import { useProjectDetail } from '@/app/hooks/projects/useProjectDetail';
import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';

interface ProjectDetailProps {
    projectId: string,
    userId: string | undefined,
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

    console.log(project);

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
                                <div>loading...</div>
                            ) : (
                                <div>
                                    <div>{project?.name}</div>
                                    <div>{project?.description}</div>
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