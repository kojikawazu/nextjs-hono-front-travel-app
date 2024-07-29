'use client';

import { useRouter } from 'next/navigation';
import CONSTANTS from "@/app/utils/common-constants";
import { Travel } from "@prisma/client";
import { useProjectDetail } from '@/app/hooks/projects/useProjectDetail';
import { useTravelForm } from '@/app/hooks/money/useTravelForm';
import { useTravelTotal } from '@/app/hooks/money/useTravelTotal';
import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import ProjectDetailContent from '@/app/Components/projects/project-detail/project-detail-contents/project-detail-contents';
import TravelCreateForm from '@/app/Components/projects/project-detail/travel-create-form/travel-create-form';
import TravelList from '@/app/Components/projects/project-detail/travel-list/travel-list';
import TravelTotal from './travel-total/travel-total';

interface ProjectDetailProps {
    projectId: string;
    userId: string | undefined;
    travelSCList: Travel[];
};

/**
 * プロジェクト詳細
 * @param projectId
 * @param userId
 * @param travelSCList
 * @returns JSX
 */
const ProjectDetail = ({
    projectId,
    userId,
    travelSCList,
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
        travelList,
    } = useTravelForm({
        userId: userId,
        projectId: projectId,
        travelDefaultList: travelSCList,
    });

    const {
        totalAmount,
    } = useTravelTotal({
        travelDefaultList: travelSCList,
    });

    return (
        <div className="flex flex-col h-[90%] overflow-hidden">
            <div className="p-2 border border-pink-200">
                <ProjectTitle title={project?.name ?? 'Non Title'} />
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col p-4 space-y-4">
                    <div className="flex-grow bg-white rounded-lg shadow p-3">                    
                        <ProjectDetailContent
                            isLoading={isLoading}
                            description={project?.description ?? 'Non Description'}
                        />
                    </div>

                    <div className="flex-grow bg-white rounded-lg shadow p-3">
                        <TravelCreateForm  
                            form={form}
                            onCreateSubmit={onCreateSubmit}
                        />
                    </div>
                    
                    <div className="flex-grow bg-white rounded-lg shadow p-3">
                        <TravelList 
                            travelDefaultList={travelList}
                        />
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0">
                <TravelTotal
                    total={totalAmount}
                />
            </div>
        </div>
    );
}

export default ProjectDetail;