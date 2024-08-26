/* eslint-disable no-undef */
import React from 'react';
import { differenceInDays, addDays } from 'date-fns';
import { render } from '@testing-library/react';

import CalendarTravelTdList from '@/app/Components/projects/project-calendar/morecules/calendar-travel-td-list';

const mockEvent = (
    id: string,
    startDate: Date,
    endDate: Date,
    name: string
) => ({
    id, // idプロパティを追加
    name,
    startDate,
    endDate,
    durationInDays: differenceInDays(endDate, startDate) + 1,
});

describe('CalendarTravelTdList', () => {
    it('renders a list of events for the day', () => {
        const startDate = new Date(2024, 7, 27);
        const endDate = addDays(startDate, 2); // 3日間のイベント
        const eventsForDay = [
            mockEvent('1', startDate, endDate, 'Test Event 1'),
        ];
        const weekEnd = addDays(startDate, 6); // 1週間後

        const { getByText } = render(
            <CalendarTravelTdList
                eventsForDay={eventsForDay}
                date={startDate}
                weekEnd={weekEnd}
            />
        );

        // イベント名が正しく表示されていることを確認
        expect(getByText('Test Event 1')).toBeInTheDocument();
    });

    it('calculates remaining days and days until week end correctly', () => {
        const startDate = new Date(2024, 7, 27);
        const endDate = addDays(startDate, 4); // 5日間のイベント
        const eventsForDay = [
            mockEvent('2', startDate, endDate, 'Test Event 2'),
        ];
        const weekEnd = addDays(startDate, 6); // 1週間後

        const { container } = render(
            <CalendarTravelTdList
                eventsForDay={eventsForDay}
                date={startDate}
                weekEnd={weekEnd}
            />
        );

        const divElement = container.firstChild as HTMLDivElement;

        // 正しい幅が設定されていることを確認
        expect(divElement).toHaveStyle('width: 100%');

        // 正しい残り日数と週の終わりまでの日数が計算されていることを確認
        const remainingDays = differenceInDays(endDate, startDate) + 1;
        const daysUntilWeekEnd = differenceInDays(weekEnd, startDate) + 1;

        expect(remainingDays).toBe(5);
        expect(daysUntilWeekEnd).toBe(7);
    });

    it('renders multiple events for the same day', () => {
        const startDate = new Date(2024, 7, 27);
        const endDate1 = addDays(startDate, 2);
        const endDate2 = addDays(startDate, 3);
        const eventsForDay = [
            mockEvent('3', startDate, endDate1, 'Test Event 3'),
            mockEvent('4', startDate, endDate2, 'Test Event 4'),
        ];
        const weekEnd = addDays(startDate, 6);

        const { getByText } = render(
            <CalendarTravelTdList
                eventsForDay={eventsForDay}
                date={startDate}
                weekEnd={weekEnd}
            />
        );

        // 複数のイベント名が正しく表示されていることを確認
        expect(getByText('Test Event 3')).toBeInTheDocument();
        expect(getByText('Test Event 4')).toBeInTheDocument();
    });
});
