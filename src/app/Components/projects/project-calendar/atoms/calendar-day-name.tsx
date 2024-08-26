import React from 'react';

/**
 * カレンダー曜日名
 * @returns JSX
 */
const CalendarDayName = () => {
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
};

export default CalendarDayName;
