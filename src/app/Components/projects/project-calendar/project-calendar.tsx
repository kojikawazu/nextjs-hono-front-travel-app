'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

import CONSTANTS from '@/app/utils/common-constants';
import type { TravelCalendarType } from '@/type/data.types';

import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import SideBar from '@/app/Components/layout/sidebar/side-bar';
import CommonCalendar from './calendar/common-calendar';
import CalendarChangeBtn from './calendar/calendar-change-btn';
import { useTravelCalendar } from '@/app/hooks/travels/useTravelCalendar';
import ProjectLoading from '../common/atoms/project-loading';

interface ProjectCalendarProps {
    userId: string | undefined;
    travelCalendarDataList: TravelCalendarType[];
    defaultDate: Date;
}

/**
 * プロジェクトカレンダー
 * @param userId
 * @param travelCalendarDataList
 * @param defaultDate
 * @returns JSX
 */
const ProjectCalendar = ({
    userId,
    travelCalendarDataList,
    defaultDate,
}: ProjectCalendarProps) => {
    const router = useRouter();
    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const {
        currentDate,
        prevMonth,
        nextMonth,
        handleDateClick,
    } = useTravelCalendar({ defaultDate });

    if (!userId) return <ProjectLoading label={"Loading..."} />;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <aside className="w-64 bg-white shadow-md overflow-y-auto">
                <SideBar projectSCList={[]} projectStatisticsSCList={[]} />
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
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
                        travelCalendarDataList={travelCalendarDataList}
                        onDateClick={handleDateClick}
                    />
                </section>
            </main>
        </div>
    );
};

export default ProjectCalendar;
