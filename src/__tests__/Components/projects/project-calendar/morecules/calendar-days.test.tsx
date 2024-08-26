/* eslint-disable no-undef */
import React from 'react';
import { addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { render, fireEvent } from '@testing-library/react';

import CalendarDays from '@/app/Components/projects/project-calendar/morecules/calendar-days';

const mockEvent = (
    id: string,
    startDate: Date,
    endDate: Date,
    name: string
) => ({
    id,
    name,
    startDate,
    endDate,
    durationInDays: endDate.getDate() - startDate.getDate() + 1,
});

describe('CalendarDays', () => {
    it('renders days and handles click events', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const startDate = startOfMonth(currentDate);
        const endDate = endOfMonth(currentDate);
        const dateArray = eachDayOfInterval({ start: startDate, end: endDate });

        const eventsForDay = [
            mockEvent('1', currentDate, addDays(currentDate, 2), 'Event 1'),
        ];

        const onDateClick = jest.fn();

        const { getByText } = render(
            <CalendarDays
                dateArray={dateArray}
                currentDate={currentDate}
                mergedEvents={eventsForDay}
                onDateClick={onDateClick}
                mounted={true}
            />
        );

        // 日付が正しくレンダリングされていることを確認
        const dayLabel = getByText('1');
        expect(dayLabel).toBeInTheDocument();

        // 日付をクリックしたときにonDateClickが呼び出されることを確認
        fireEvent.click(dayLabel);
        expect(onDateClick).toHaveBeenCalledWith(currentDate);
    });

    it("applies the correct styles for today's date", () => {
        const currentDate = new Date(); // 今日の日付
        const startDate = startOfMonth(currentDate);
        const endDate = endOfMonth(currentDate);
        const dateArray = eachDayOfInterval({ start: startDate, end: endDate });

        const eventsForDay = [
            mockEvent('2', currentDate, addDays(currentDate, 1), 'Event 2'),
        ];

        const { container } = render(
            <CalendarDays
                dateArray={dateArray}
                currentDate={currentDate}
                mergedEvents={eventsForDay}
                onDateClick={() => {}}
                mounted={true}
            />
        );

        // 今日の日付に対して正しいスタイルが適用されていることを確認
        const todayElement = container.querySelector('.border-blue-500');
        expect(todayElement).toBeInTheDocument();
    });

    it('renders events for the correct day', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const startDate = startOfMonth(currentDate);
        const endDate = endOfMonth(currentDate);
        const dateArray = eachDayOfInterval({ start: startDate, end: endDate });

        const eventsForDay = [
            mockEvent('3', currentDate, addDays(currentDate, 2), 'Event 3'),
        ];

        const { getAllByText } = render(
            <CalendarDays
                dateArray={dateArray}
                currentDate={currentDate}
                mergedEvents={eventsForDay}
                onDateClick={() => {}}
                mounted={true}
            />
        );

        // イベント名が複数表示されていることを確認
        const eventElements = getAllByText('Event 3');
        expect(eventElements.length).toBeGreaterThan(0);
    });

    it('applies opacity style for days outside the current month', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const prevMonthDate = new Date(2024, 6, 31); // 2024年7月31日
        const dateArray = [prevMonthDate, currentDate];

        const { container } = render(
            <CalendarDays
                dateArray={dateArray}
                currentDate={currentDate}
                mergedEvents={[]}
                onDateClick={() => {}}
                mounted={true}
            />
        );

        // 前月の日付に対してopacityスタイルが適用されていることを確認
        const prevMonthElement = container.querySelector('.opacity-50');
        expect(prevMonthElement).toBeInTheDocument();
    });
});
