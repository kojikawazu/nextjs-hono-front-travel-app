import React, { Suspense } from 'react';

import {
    getAuthUser,
    getTravelGroupsByUserId,
} from '@/app/utils/supabase/supabase-server-functions';

import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import ProjectStatistics from '@/app/Components/projects/project-statistics/project-statistics';

/**
 * プロジェクト統計(サーバーサイド)
 * @returns JSX
 */
const ProjectServerStatistics = async () => {
    const user = await getAuthUser();
    const statisticsDataSCList = await getTravelGroupsByUserId(
        'month',
        user?.id as string
    );

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectStatistics
                userId={user?.id}
                statisticsDataSCList={statisticsDataSCList}
            />
        </Suspense>
    );
};

export default ProjectServerStatistics;
