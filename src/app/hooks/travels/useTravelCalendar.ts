import { useState } from 'react';

import CONSTANTS from '@/app/utils/common-constants';
import type { TravelCalendarType } from '@/type/data.types';

interface TravelCalendarProps {
    userId: string | undefined;
    defaultDate: Date;
    initialTravelCalendarList: TravelCalendarType[];
}

/**
 * 旅行カレンダーフック
 * @param userId
 * @param defaultDate
 * @param initialTravelCalendarList
 * @returns 旅行カレンダーフック
 */
export const useTravelCalendar = ({
    userId,
    defaultDate,
    initialTravelCalendarList,
}: TravelCalendarProps) => {
    const [currentDate, setCurrentDate] = useState(defaultDate);
    const [travelCalendarDataList, setTravelCalendarDataList] = useState(
        initialTravelCalendarList
    );

    const prevMonth = async () => {
        const newDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() - 1,
            1
        );
        setCurrentDate(newDate);
        await fetchTravelCalendarData(newDate);
    };

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
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 月は0が1月なので+1

        const resGetTravelCalendarList = await fetch(
            `${CONSTANTS.SC_TRAVEL_CALENDAR_DATAS_URL}/${userId}/${year}年${month}月`
        );

        if (resGetTravelCalendarList.ok) {
            const travelData: TravelCalendarType[] =
                await resGetTravelCalendarList.json();
            setTravelCalendarDataList(travelData);
        } else {
            console.error('Failed to fetch travel calendar data');
        }
    };

    const handleDateClick = (date: Date) => {
        console.log('Clicked date:', date);
    };

    return {
        currentDate,
        travelCalendarDataList,
        setTravelCalendarDataList,
        prevMonth,
        nextMonth,
        handleDateClick,
    };
};
