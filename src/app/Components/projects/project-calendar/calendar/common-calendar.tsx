import React, { useMemo } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    parseISO,
} from 'date-fns';

import type { TravelCalendarType } from '@/type/data.types';

interface CommonCalendarProps {
    currentDate: Date;
    travelCalendarDataList: TravelCalendarType[];
    onDateClick?: (date: Date) => void;
}

/**
 * カレンダー共通コンポーネント
 * @param currentDate
 * @param travelCalendarDataList
 * @param onDateClick
 * @returns JSX
 */
const CommonCalendar = ({
    currentDate,
    travelCalendarDataList,
    onDateClick,
}: CommonCalendarProps) => {
    const renderCalendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const dateArray = eachDayOfInterval({
            start: monthStart,
            end: monthEnd,
        });
        const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

        return (
            <>
                {dayNames.map((day, index) => (
                    <div
                        key={`header-${index}`}
                        className="text-center font-semibold text-gray-600 p-2 border-b"
                    >
                        {day}
                    </div>
                ))}
                {dateArray.map((date, index) => {
                    const travelEvents = travelCalendarDataList.filter(
                        (travel) => {
                            const travelDate =
                                travel.date instanceof Date
                                    ? travel.date
                                    : parseISO(travel.date);
                            return isSameDay(date, travelDate);
                        }
                    );
                    const isWeekend =
                        date.getDay() === 0 || date.getDay() === 6;
                    const isToday = isSameDay(date, new Date());
                    const isCurrentMonth = isSameMonth(date, currentDate);

                    return (
                        <div
                            key={index}
                            onClick={() => onDateClick?.(date)}
                            className={`p-2 border relative min-h-[100px] transition-colors duration-200 cursor-pointer
                                ${isWeekend ? 'bg-gray-50' : 'bg-white'}
                                ${isToday ? 'border-blue-500 border-2' : 'border-gray-200'}
                                ${!isCurrentMonth ? 'opacity-50' : ''}
                                hover:bg-gray-100`}
                        >
                            <span
                                className={`
                                ${isWeekend ? 'text-red-500' : 'text-gray-700'} 
                                ${isToday ? 'font-bold' : ''}
                            `}
                            >
                                {format(date, 'd')}
                            </span>
                            {travelEvents.map((event, eventIndex) => (
                                <div
                                    key={eventIndex}
                                    className="mt-1 bg-blue-100 text-blue-800 text-xs p-1 rounded shadow-sm"
                                >
                                    {event.name}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </>
        );
    }, [currentDate, travelCalendarDataList, onDateClick]);

    return (
        <div className="grid grid-cols-7 gap-1 h-full bg-white rounded-lg shadow-lg p-2">
            {renderCalendarDays}
        </div>
    );
};

export default CommonCalendar;
