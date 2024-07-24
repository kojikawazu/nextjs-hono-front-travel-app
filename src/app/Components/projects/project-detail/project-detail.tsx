'use client';

import { useRouter } from 'next/navigation';
import CONSTANTS from "@/app/utils/common-constants";
import { useProjectDetail } from '@/app/hooks/projects/useProjectDetail';
import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import ProjectDetailContent from '@/app/Components/projects/project-detail/project-detail-contents/project-detail-contents';
import TravelCreateForm from '@/app/Components/projects/project-detail/travel-create-form/travel-create-form';
import { useTravelForm } from '@/app/hooks/money/useTravelForm';

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

    const {
        form,
        onCreateSubmit,
    } = useTravelForm({
        userId: userId,
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
                        <ProjectDetailContent
                            isLoading={isLoading}
                            name={project?.name ?? 'Non Title'}
                            description={project?.description ?? 'Non Description'}
                        />
                    </div>

                    <div className="bg-white rounded-lg shadow p-4">
                        <TravelCreateForm  
                            form={form}
                            onCreateSubmit={onCreateSubmit}
                        />
                    </div>
                    
                    <div>MoneyList</div>
                    <div>MoneyTotal</div>
                </div>
            </div>
        </>
    );
}

export default ProjectDetail;