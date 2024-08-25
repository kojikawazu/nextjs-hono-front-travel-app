import { useState } from 'react';

interface TravelCalendarProps {
    defaultDate: Date;
};

/**
 * 旅行カレンダーフック
 * @param defaultDate
 * @returns 旅行カレンダーフック
 */
export const useTravelCalendar = ({
    defaultDate,
}: TravelCalendarProps) => {
    const [isClient, setIsClient] = useState(false);
    const [currentDate, setCurrentDate] = useState(defaultDate);

    const prevMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentDate(
            new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        );
    };

    const handleDateClick = (date: Date) => {
        console.log('Clicked date:', date);
    };

    return {
        isClient,
        setIsClient,
        currentDate,
        prevMonth,
        nextMonth,
        handleDateClick,
    };
}