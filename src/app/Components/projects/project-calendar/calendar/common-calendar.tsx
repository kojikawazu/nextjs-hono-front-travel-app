import React, { useMemo, useState, useEffect } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isWithinInterval,
    differenceInDays,
    endOfWeek,
    startOfDay,
    endOfDay,
} from 'date-fns';

import type { ProjectCalendarType } from '@/type/data.types';

interface CommonCalendarProps {
    currentDate: Date;
    projectCalendarDataList: ProjectCalendarType[];
    onDateClick?: (date: Date) => void;
}

interface MergedEvent extends ProjectCalendarType {
    durationInDays: number;
}

/**
 * カレンダー共通コンポーネント
 * @param currentDate
 * @param projectCalendarDataList
 * @param onDateClick
 * @returns JSX
 */
const CommonCalendar = ({
    currentDate,
    projectCalendarDataList,
    onDateClick,
}: CommonCalendarProps) => {
    // マウント状態(projectCalendarDataListが更新されたときに再レンダリングを行うため)
    const [mounted, setMounted] = useState(false);

    // マウント時にmountedをtrueにする
    // projectCalendarDataListが更新されたときに再レンダリングを行うため
    useEffect(() => {
        setMounted(true);
    }, []);

    const renderDayNames = useMemo(() => {
        const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

        return (
            <>
                {dayNames.map((day, index) => (
                    <div
                        key={`header-${index}`}
                        className="text-center font-semibold text-gray-600 py-1"
                    >
                        {day}
                    </div>
                ))}
            </>
        );
    }, []);

    const renderCalendarDays = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const dateArray = eachDayOfInterval({
            start: monthStart,
            end: monthEnd,
        });

        const mergedEvents: MergedEvent[] = projectCalendarDataList.reduce(
            (acc, event) => {
                const existingEvent = acc.find(
                    (e) =>
                        e.name === event.name &&
                        isWithinInterval(
                            startOfDay(new Date(event.startDate!)),
                            {
                                start: startOfDay(new Date(e.startDate!)),
                                end: endOfDay(new Date(e.endDate!)),
                            }
                        )
                );

                if (existingEvent) {
                    existingEvent.endDate = new Date(
                        Math.max(
                            new Date(existingEvent.endDate!).getTime(),
                            new Date(event.endDate!).getTime()
                        )
                    );
                    existingEvent.durationInDays =
                        differenceInDays(
                            new Date(existingEvent.endDate!),
                            new Date(existingEvent.startDate!)
                        ) + 1;
                } else {
                    acc.push({
                        ...event,
                        durationInDays:
                            differenceInDays(
                                new Date(event.endDate!),
                                new Date(event.startDate!)
                            ) + 1,
                    });
                }
                return acc;
            },
            [] as MergedEvent[]
        );

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
                            <span
                                className={`absolute top-1 left-1 text-sm
                                ${isToday ? 'font-bold' : ''}
                            `}
                            >
                                {format(date, 'd')}
                            </span>
                            {mounted &&
                                eventsForDay.map((event, eventIndex) => {
                                    const isStartDay = true;
                                    const remainingDays =
                                        differenceInDays(
                                            new Date(event.endDate!),
                                            date
                                        ) + 1;
                                    const daysUntilWeekEnd =
                                        differenceInDays(weekEnd, date) + 1;
                                    const widthPercentage = `100%`;

                                    return (
                                        <div
                                            key={eventIndex}
                                            className={`absolute left-0 h-4 bg-blue-200 overflow-hidden whitespace-nowrap text-xs`}
                                            style={{
                                                width: widthPercentage,
                                                top: `${eventIndex * 16 + 20}px`,
                                                borderTopLeftRadius: isStartDay
                                                    ? '2px'
                                                    : '0',
                                                borderBottomLeftRadius:
                                                    isStartDay ? '2px' : '0',
                                                borderTopRightRadius:
                                                    remainingDays <=
                                                    daysUntilWeekEnd
                                                        ? '2px'
                                                        : '0',
                                                borderBottomRightRadius:
                                                    remainingDays <=
                                                    daysUntilWeekEnd
                                                        ? '2px'
                                                        : '0',
                                            }}
                                        >
                                            <span className="px-1">
                                                {isStartDay ? event.name : ''}
                                            </span>
                                        </div>
                                    );
                                })}
                        </div>
                    );
                })}
            </>
        );
    }, [currentDate, projectCalendarDataList, onDateClick, mounted]);

    return (
        <>
            <div className="grid grid-cols-7 h-10 bg-white rounded-t-lg shadow-lg mb-4">
                {renderDayNames}
            </div>
            <div className="grid grid-cols-7 h-full bg-white rounded-lg shadow-lg border-l border-t">
                {renderCalendarDays}
            </div>
        </>
    );
};

export default CommonCalendar;
