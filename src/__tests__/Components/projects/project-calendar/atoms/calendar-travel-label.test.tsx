/* eslint-disable no-undef */
import React from 'react';
import { format } from 'date-fns';
import { render } from '@testing-library/react';

import CalendarTravelLabel from '@/app/Components/projects/project-calendar/atoms/calendar-travel-label';

describe('CalendarTravelLabel', () => {
    it('renders the date correctly', () => {
        const testDate = new Date(2024, 7, 27); // 2024年8月27日
        const { getByText } = render(
            <CalendarTravelLabel isToday={false} date={testDate} />
        );

        // 日付が正しく表示されていることを確認
        const formattedDate = format(testDate, 'd');
        expect(getByText(formattedDate)).toBeInTheDocument();
    });

    it("applies bold style for today's date", () => {
        const todayDate = new Date();
        const { getByText } = render(
            <CalendarTravelLabel isToday={true} date={todayDate} />
        );

        // 今日の日付が太字で表示されていることを確認
        const formattedDate = format(todayDate, 'd');
        const label = getByText(formattedDate);
        expect(label).toHaveClass('font-bold');
    });

    it("does not apply bold style for non-today's date", () => {
        const testDate = new Date(2024, 7, 26); // 今日以外の日付
        const { getByText } = render(
            <CalendarTravelLabel isToday={false} date={testDate} />
        );

        // 今日以外の日付には太字が適用されていないことを確認
        const formattedDate = format(testDate, 'd');
        const label = getByText(formattedDate);
        expect(label).not.toHaveClass('font-bold');
    });
});
