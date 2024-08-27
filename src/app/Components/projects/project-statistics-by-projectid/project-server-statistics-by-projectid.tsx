import React, { Suspense } from 'react';

import {
    getAuthUser,
    getTravelGroupsByUserIdAndProjectId,
} from '@/app/utils/supabase/supabase-server-functions';

import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import ProjectStatisticsByProjectId from '@/app/Components/projects/project-statistics-by-projectid/project-statistics-by-projectid';

interface ProjectServerStatisticsByProjectIdProps {
    projectId: string;
}

/**
 * プロジェクト統計(プロジェクトID指定)
 * @param projectId
 * @returns JSX
 */
const ProjectServerStatisticsByProjectId = async ({
    projectId,
}: ProjectServerStatisticsByProjectIdProps) => {
    const user = await getAuthUser();
    const statisticsDataSCList = await getTravelGroupsByUserIdAndProjectId(
        'month',
        user?.id as string,
        projectId
    );

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectStatisticsByProjectId
                userId={user?.id}
                projectId={projectId}
                statisticsDataSCList={statisticsDataSCList}
            />
        </Suspense>
    );
};

export default ProjectServerStatisticsByProjectId;
