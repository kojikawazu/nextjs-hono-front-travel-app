import { Suspense } from 'react';

import {
    getAuthUser,
    getTravelListProjectId,
    getTravelListByUserIdAndProjectId,
} from '@/app/utils/supabase/supabase-server-functions';

import ProjectDetail from '@/app/Components/projects/project-detail/project-detail';
import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';

interface ProjectServerDetailProps {
    projectId: string;
}

/**
 * プロジェクト詳細(サーバー版)
 * @returns JSX
 */
const ProjectServerDetail = async ({ projectId }: ProjectServerDetailProps) => {
    const user = await getAuthUser();
    const travelSCList = await getTravelListByUserIdAndProjectId(
        user?.id as string,
        projectId
    );
    const SCProject = await getTravelListProjectId(projectId);

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectDetail
                projectId={projectId}
                userId={user?.id}
                travelSCList={travelSCList}
                SCProject={SCProject}
            />
        </Suspense>
    );
};

export default ProjectServerDetail;
