import React from 'react';
import {
    isSameDay,
    isSameMonth,
    isWithinInterval,
    startOfDay,
    endOfDay,
    endOfWeek,
} from 'date-fns';

import type { ProjectCalendarType } from '@/type/data.types';

import CalendarTravelLabelList from '@/app/Components/projects/project-calendar/morecules/calendar-travel-td-list';
import CalendarTravelLabel from '@/app/Components/projects/project-calendar/atoms/calendar-travel-label';

interface MergedEvent extends ProjectCalendarType {
    durationInDays: number;
}

interface CalendarDaysProps {
    dateArray: Date[];
    currentDate: Date;
    mergedEvents: MergedEvent[];
    onDateClick?: (date: Date) => void;
    mounted: boolean;
}

/**
 * カレンダー日付コンポーネント
 * @param dateArray
 * @param currentDate
 * @param mergedEvents
 * @param onDateClick
 * @param mounted
 * @returns JSX
 */
const CalendarDays = ({
    dateArray,
    currentDate,
    mergedEvents,
    onDateClick,
    mounted,
}: CalendarDaysProps) => {
    return (
        <>
            {dateArray.map((date, index) => {
                const isToday = isSameDay(date, new Date());
                const isCurrentMonth = isSameMonth(date, currentDate);
                const weekEnd = endOfWeek(date);
                const eventsForDay = mergedEvents.filter((event) =>
                    isWithinInterval(startOfDay(date), {
                        start: startOfDay(new Date(event.startDate!)),
                        end: endOfDay(new Date(event.endDate!)),
                    })
                );

                return (
                    <div
                        key={index}
                        onClick={() => onDateClick?.(date)}
                        className={`border-r border-b relative h-full transition-colors duration-200 cursor-pointer
                            ${isToday ? 'border-blue-500 border-2' : ''}
                            ${!isCurrentMonth ? 'opacity-50' : ''}
                            hover:bg-gray-100`}
                    >
                        <CalendarTravelLabel isToday={isToday} date={date} />
                        {mounted && (
                            <CalendarTravelLabelList
                                eventsForDay={eventsForDay}
                                date={date}
                                weekEnd={weekEnd}
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
};

export default CalendarDays;
