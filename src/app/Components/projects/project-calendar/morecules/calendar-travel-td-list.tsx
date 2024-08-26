import React from 'react';
import { differenceInDays } from 'date-fns';

import type { ProjectCalendarType } from '@/type/data.types';
import CalendarTravelLabel from '@/app/Components/projects/project-calendar/atoms/calendar-travel-td';

interface MergedEvent extends ProjectCalendarType {
    durationInDays: number;
}

interface CalendarTravelTdListProps {
    eventsForDay: MergedEvent[];
    date: Date;
    weekEnd: Date;
}

/**
 * カレンダー移動ラベルリストコンポーネント
 * @param eventsForDay
 * @param date
 * @param weekEnd
 * @returns JSX
 */
const CalendarTravelTdList = ({
    eventsForDay,
    date,
    weekEnd,
}: CalendarTravelTdListProps) => {
    const isStartDay = true;
    const daysUntilWeekEnd = differenceInDays(weekEnd, date) + 1;
    const widthPercentage = `100%`;

    return (
        <>
            {eventsForDay.map((event, eventIndex) => {
                const remainingDays =
                    differenceInDays(new Date(event.endDate!), date) + 1;

                return (
                    <CalendarTravelLabel
                        key={eventIndex}
                        widthPercentage={widthPercentage}
                        eventIndex={eventIndex}
                        isStartDay={isStartDay}
                        remainingDays={remainingDays}
                        daysUntilWeekEnd={daysUntilWeekEnd}
                        event={event}
                    />
                );
            })}
        </>
    );
};

export default CalendarTravelTdList;
