import React, { Suspense } from 'react';

import type { ProjectCalendarType } from '@/type/data.types';
import {
    getAuthUser,
    getProjectCalendarByUserId,
} from '@/app/utils/supabase/supabase-server-functions';
import { changeProjectCalendarList } from '@/app/utils/change/change-functions';

import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import ProjectCalendar from '@/app/Components/projects/project-calendar/project-calendar';

/**
 * プロジェクトカレンダー(サーバーコンポーネント版)
 * @returns JSX
 */
const ProjectServerCalendar = async () => {
    const defaultDate = new Date(2024, 5, 1);
    const year = 2024;
    const month = 6;

    const user = await getAuthUser();

    let initialProjectCalendarList: ProjectCalendarType[] = [];
    if (user != null) {
        const projectCalendarSCList: ProjectCalendarType[] =
            await getProjectCalendarByUserId(user?.id as string, year, month);
        initialProjectCalendarList = changeProjectCalendarList(
            projectCalendarSCList
        );
    }

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectCalendar
                userId={user?.id}
                initialProjectCalendarList={initialProjectCalendarList}
                defaultDate={defaultDate}
            />
        </Suspense>
    );
};

export default ProjectServerCalendar;
