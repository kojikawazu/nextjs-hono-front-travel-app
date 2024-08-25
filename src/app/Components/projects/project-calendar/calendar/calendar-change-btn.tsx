import React from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

interface CalendarChangeBtnProps {
    currentDate: Date;
    prevMonth: () => void;
    nextMonth: () => void;
}

/**
 * カレンダー日付変更ボタン
 * @param currentDate
 * @param prevMonth
 * @param nextMonth
 * @returns JSX
 */
const CalendarChangeBtn = ({
    currentDate,
    prevMonth,
    nextMonth,
}: CalendarChangeBtnProps) => {
    return (
        <div className="flex items-center space-x-4">
            <button
                onClick={prevMonth}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
                &lt;
            </button>
            <h2 className="text-xl font-bold text-gray-800">
                {format(currentDate, 'yyyy年MM月', {
                    locale: ja,
                })}
            </h2>
            <button
                onClick={nextMonth}
                className="text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
                &gt;
            </button>
        </div>
    );
};

export default CalendarChangeBtn;
