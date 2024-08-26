import React from 'react';
import { format } from 'date-fns';

interface CalendarTravelLabelProps {
    isToday: boolean;
    date: Date;
}

/**
 * カレンダー移動ラベルコンポーネント
 * @param isToday
 * @param date
 * @returns JSX
 */
const CalendarTravelLabel = ({ isToday, date }: CalendarTravelLabelProps) => {
    return (
        <span
            className={`absolute top-1 left-1 text-sm
            ${isToday ? 'font-bold' : ''}
        `}
        >
            {format(date, 'd')}
        </span>
    );
};

export default CalendarTravelLabel;
