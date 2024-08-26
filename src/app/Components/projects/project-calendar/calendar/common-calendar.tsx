import React, { useMemo, useState, useEffect } from 'react';
import {
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isWithinInterval,
    differenceInDays,
    startOfDay,
    endOfDay,
} from 'date-fns';

import type { ProjectCalendarType } from '@/type/data.types';

import CalendarDayName from '@/app/Components/projects/project-calendar/atoms/calendar-day-name';
import CalendarDays from '@/app/Components/projects/project-calendar/morecules/calendar-days';

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

    // currentDateの月の日付配列を取得
    const dateArray = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        return eachDayOfInterval({
            start: monthStart,
            end: monthEnd,
        });
    }, [currentDate]);

    // イベントをマージ
    const mergedEvents = useMemo(() => {
        return projectCalendarDataList.reduce((acc, event) => {
            const existingEvent = acc.find(
                (e) =>
                    e.name === event.name &&
                    isWithinInterval(startOfDay(new Date(event.startDate!)), {
                        start: startOfDay(new Date(e.startDate!)),
                        end: endOfDay(new Date(e.endDate!)),
                    })
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
        }, [] as MergedEvent[]);
    }, [projectCalendarDataList]);

    return (
        <>
            <div className="grid grid-cols-7 h-10 bg-white rounded-t-lg shadow-lg mb-4">
                <CalendarDayName />
            </div>
            <div className="grid grid-cols-7 h-full bg-white rounded-lg shadow-lg border-l border-t">
                <CalendarDays
                    dateArray={dateArray}
                    currentDate={currentDate}
                    mergedEvents={mergedEvents}
                    onDateClick={onDateClick}
                    mounted={mounted}
                />
            </div>
        </>
    );
};

export default CommonCalendar;
