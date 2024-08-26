import React from 'react';

interface CalendarTravelTdProps {
    widthPercentage: string;
    eventIndex: number;
    isStartDay: boolean;
    remainingDays: number;
    daysUntilWeekEnd: number;
    event: { name: string };
}

/**
 * カレンダー移動ラベルコンポーネント
 * @param widthPercentage
 * @param eventIndex
 * @param isStartDay
 * @param remainingDays
 * @param daysUntilWeekEnd
 * @param event
 * @returns JSX
 */
const CalendarTravelTd = ({
    widthPercentage,
    eventIndex,
    isStartDay,
    remainingDays,
    daysUntilWeekEnd,
    event,
}: CalendarTravelTdProps) => {
    return (
        <div
            className={`absolute left-0 h-4 bg-blue-200 overflow-hidden whitespace-nowrap text-xs`}
            style={{
                width: widthPercentage,
                top: `${eventIndex * 16 + 20}px`,
                borderTopLeftRadius: isStartDay ? '2px' : '0',
                borderBottomLeftRadius: isStartDay ? '2px' : '0',
                borderTopRightRadius:
                    remainingDays <= daysUntilWeekEnd ? '2px' : '0',
                borderBottomRightRadius:
                    remainingDays <= daysUntilWeekEnd ? '2px' : '0',
            }}
        >
            <span className="px-1">{isStartDay ? event.name : ''}</span>
        </div>
    );
};

export default CalendarTravelTd;
