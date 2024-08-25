import React, { Suspense } from 'react';
import { getAuthUser } from '@/app/utils/server/supabase-functions';

import CONSTANTS from '@/app/utils/common-constants';
import { Travel } from '@prisma/client';
import type { TravelCalendarType } from '@/type/data.types';

import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import ProjectCalendar from '@/app/Components/projects/project-calendar/project-calendar';

/**
 * プロジェクトカレンダー(サーバーコンポーネント版)
 * @returns JSX
 */
const ProjectServerCalendar = async () => {
    const defaultMonthStr = '2024年6月';
    const user = await getAuthUser();

    const resGetTravelCalendarList = await fetch(
        `${CONSTANTS.SC_TRAVEL_CALENDAR_DATAS_URL}/${user?.id}/${defaultMonthStr}`
    );
    const travelCalendarSCList: Travel[] =
        await resGetTravelCalendarList.json();
    const initialTravelCalendarList: TravelCalendarType[] =
        travelCalendarSCList.map((travel) => ({
            date: new Date(travel.date?.toString() as string),
            name: travel.name,
        }));

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectCalendar
                userId={user?.id}
                initialTravelCalendarList={initialTravelCalendarList}
                defaultDate={new Date(2024, 5, 1)}
            />
        </Suspense>
    );
};

export default ProjectServerCalendar;
