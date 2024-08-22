import React, { Suspense } from 'react';

import {
    getAuthUser,
    getProjectList,
    getTravelGroupsByUserId,
} from '@/app/utils/server/supabase-functions';

import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import ProjectStatistics from '@/app/Components/projects/project-statistics/project-statistics';

/**
 * プロジェクト統計(サーバーサイド)
 * @returns JSX
 */
const ProjectServerStatistics = async () => {
    const user = await getAuthUser();
    const projectSCList = await getProjectList(user?.id as string);
    const statisticsDataSCList = await getTravelGroupsByUserId(
        'month',
        user?.id as string
    );

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectStatistics
                userId={user?.id}
                projectSCList={projectSCList}
                statisticsDataSCList={statisticsDataSCList}
            />
        </Suspense>
    );
};

export default ProjectServerStatistics;
