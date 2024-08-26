/* eslint-disable no-undef */
import React from 'react';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { render, fireEvent } from '@testing-library/react';

import CalendarChangeBtn from '@/app/Components/projects/project-calendar/atoms/calendar-change-btn';

describe('CalendarChangeBtn', () => {
    it('displays the correct current date', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const prevMonth = jest.fn();
        const nextMonth = jest.fn();

        const { getByText } = render(
            <CalendarChangeBtn
                currentDate={currentDate}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
        );

        // 日付が正しく表示されていることを確認
        const formattedDate = format(currentDate, 'yyyy年MM月', { locale: ja });
        expect(getByText(formattedDate)).toBeInTheDocument();
    });

    it('calls prevMonth when the left button is clicked', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const prevMonth = jest.fn();
        const nextMonth = jest.fn();

        const { getByRole } = render(
            <CalendarChangeBtn
                currentDate={currentDate}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
        );

        // 左ボタンをクリックしたときにprevMonthが呼び出されることを確認
        fireEvent.click(getByRole('button', { name: /</i }));
        expect(prevMonth).toHaveBeenCalledTimes(1);
    });

    it('calls nextMonth when the right button is clicked', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const prevMonth = jest.fn();
        const nextMonth = jest.fn();

        const { getByRole } = render(
            <CalendarChangeBtn
                currentDate={currentDate}
                prevMonth={prevMonth}
                nextMonth={nextMonth}
            />
        );

        // 右ボタンをクリックしたときにnextMonthが呼び出されることを確認
        fireEvent.click(getByRole('button', { name: />/i }));
        expect(nextMonth).toHaveBeenCalledTimes(1);
    });
});
