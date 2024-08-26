/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { addDays } from 'date-fns';

import CommonCalendar from '@/app/Components/projects/project-calendar/calendar/common-calendar';

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

describe('CommonCalendar', () => {
    it('renders calendar with correct number of days', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const projectCalendarDataList = [
            mockEvent('1', currentDate, addDays(currentDate, 2), 'Event 1'),
        ];

        const { container } = render(
            <CommonCalendar
                currentDate={currentDate}
                projectCalendarDataList={projectCalendarDataList}
            />
        );

        // カレンダーの日付が正しくレンダリングされていることを確認
        const days = container.querySelectorAll(
            '.grid-cols-7 > .border-r.border-b'
        ); // 日付のみを選択
        expect(days).toHaveLength(31); // 2024年8月は31日
    });

    it('merges overlapping events correctly', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const overlappingEvent1 = mockEvent(
            '1',
            currentDate,
            addDays(currentDate, 2),
            'Event 1'
        );
        const overlappingEvent2 = mockEvent(
            '2',
            currentDate,
            addDays(currentDate, 3),
            'Event 1'
        );
        const projectCalendarDataList = [overlappingEvent1, overlappingEvent2];

        const { getAllByText } = render(
            <CommonCalendar
                currentDate={currentDate}
                projectCalendarDataList={projectCalendarDataList}
            />
        );

        // イベントがマージされて表示されているか確認
        const eventElements = getAllByText('Event 1');
        expect(eventElements.length).toBeGreaterThan(0);
    });

    it('handles onDateClick event correctly', () => {
        const currentDate = new Date(2024, 7, 1); // 2024年8月1日
        const projectCalendarDataList = [
            mockEvent('1', currentDate, addDays(currentDate, 2), 'Event 1'),
        ];

        const onDateClick = jest.fn();

        const { getByText } = render(
            <CommonCalendar
                currentDate={currentDate}
                projectCalendarDataList={projectCalendarDataList}
                onDateClick={onDateClick}
            />
        );

        // 日付をクリックしたときにonDateClickが呼び出されることを確認
        fireEvent.click(getByText('1')); // 1日目をクリック
        expect(onDateClick).toHaveBeenCalledWith(currentDate);
    });
});
