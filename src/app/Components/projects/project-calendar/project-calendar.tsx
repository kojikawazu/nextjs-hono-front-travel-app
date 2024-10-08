'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import CONSTANTS from '@/app/utils/common-constants';
import type { ProjectCalendarType } from '@/type/data.types';
import { useTravelCalendar } from '@/app/hooks/travels/useTravelCalendar';

import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import CommonCalendar from '@/app/Components/projects/project-calendar/calendar/common-calendar';
import CalendarChangeBtn from '@/app/Components/projects/project-calendar/atoms/calendar-change-btn';

interface ProjectCalendarProps {
    userId: string | undefined;
    initialProjectCalendarList: ProjectCalendarType[];
    defaultDate: Date;
}

/**
 * プロジェクトカレンダー
 * @param userId
 * @param initialProjectCalendarList
 * @param defaultDate
 * @returns JSX
 */
const ProjectCalendar = ({
    userId,
    initialProjectCalendarList,
    defaultDate,
}: ProjectCalendarProps) => {
    const router = useRouter();
    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const {
        currentDate,
        projectCalendarDataList,
        prevMonth,
        nextMonth,
        handleDateClick,
    } = useTravelCalendar({
        userId,
        defaultDate,
        initialProjectCalendarList,
    });

    if (!userId) return <ProjectLoading label={'Loading...'} />;

    return (
        <>
            <header className="bg-white shadow-sm p-4">
                <div className="flex justify-between items-center">
                    <ProjectTitle title="プロジェクトカレンダー" />
                    <CalendarChangeBtn
                        currentDate={currentDate}
                        prevMonth={prevMonth}
                        nextMonth={nextMonth}
                    />
                </div>
            </header>

            <section className="flex-1 overflow-y-auto p-4">
                <CommonCalendar
                    currentDate={currentDate}
                    projectCalendarDataList={projectCalendarDataList}
                    onDateClick={handleDateClick}
                />
            </section>
        </>
    );
};

export default ProjectCalendar;
