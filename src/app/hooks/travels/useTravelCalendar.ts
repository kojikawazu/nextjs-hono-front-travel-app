import { useState } from 'react';

import type { ProjectCalendarType } from '@/type/data.types';
import { getProjectCalendarByUserId } from '@/app/utils/supabase/supabase-client-functions';
import { changeProjectCalendarList } from '@/app/utils/change/change-functions';

interface TravelCalendarProps {
    userId: string | undefined;
    defaultDate: Date;
    initialProjectCalendarList: ProjectCalendarType[];
}

/**
 * 旅行カレンダーフック
 * @param userId
 * @param defaultDate
 * @param initialProjectCalendarList
 * @returns 旅行カレンダーフック
 */
export const useTravelCalendar = ({
    userId,
    defaultDate,
    initialProjectCalendarList,
}: TravelCalendarProps) => {
    const [currentDate, setCurrentDate] = useState(defaultDate);
    const [projectCalendarDataList, setProjectCalendarDataList] = useState(
        initialProjectCalendarList
    );

    /**
     * 前月へ
     */
    const prevMonth = async () => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        );
        setCurrentDate(newDate);
        await fetchTravelCalendarData(newDate);
    };

    /**
     * 翌月へ
     */
    const nextMonth = async () => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            1
        );
        setCurrentDate(newDate);
        await fetchTravelCalendarData(newDate);
    };

    const fetchTravelCalendarData = async (date: Date) => {
        if (!userId) return;

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 月は0が1月なので+1

        const projectCalendarSCList: ProjectCalendarType[] =
            await getProjectCalendarByUserId(userId as string, year, month);
        const changedProjectCalendarList: ProjectCalendarType[] =
            changeProjectCalendarList(projectCalendarSCList);
        setProjectCalendarDataList(changedProjectCalendarList);
    };

    const handleDateClick = (date: Date) => {
        console.log('Clicked date:', date);
    };

    return {
        currentDate,
        projectCalendarDataList,
        setProjectCalendarDataList,
        prevMonth,
        nextMonth,
        handleDateClick,
    };
};
