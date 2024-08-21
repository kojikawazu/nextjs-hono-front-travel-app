import React, { Suspense } from 'react';
import { supabaseServer } from '@/app/lib/supabase/supabase-server';

import type { TravelStatisticsType } from '@/type/data.types';
import CONSTANTS from '@/app/utils/common-constants';
import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import ProjectStatistics from '@/app/Components/projects/project-statistics/project-statistics';

/**
 * プロジェクト統計(サーバーサイド)
 * @returns JSX
 */
const ProjectServerStatistics = async () => {
    const supabase = supabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const resGetTravelGroups= await fetch(
        `${CONSTANTS.SC_TRAVEL_DATAS_URL}/${user?.id}/grouped/month`
    );
    const statisticsDataSCList: TravelStatisticsType[] = await resGetTravelGroups.json();

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectStatistics userId={user?.id} statisticsDataSCList={statisticsDataSCList} />
        </Suspense>
    );
}

export default ProjectServerStatistics;