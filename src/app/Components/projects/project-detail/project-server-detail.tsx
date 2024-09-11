import { Suspense } from 'react';

import {
    getAuthUser,
    getTravelListProjectId,
    getTravelListByUserIdAndProjectId,
} from '@/app/utils/supabase/supabase-server-functions';
import { Project, Travel } from '@prisma/client';

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

    let travelSCList: Travel[] = [];
    let SCProject: Project | null = null;

    if (user != null) {
        travelSCList = await getTravelListByUserIdAndProjectId(
            user?.id as string,
            projectId
        );

        SCProject = await getTravelListProjectId(projectId);
    }

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            {SCProject ? (
                <ProjectDetail
                    projectId={projectId}
                    userId={user?.id}
                    travelSCList={travelSCList}
                    SCProject={SCProject}
                />
            ) : (
                <p>No project found or user not authenticated.</p>
            )}
        </Suspense>
    );
};

export default ProjectServerDetail;
