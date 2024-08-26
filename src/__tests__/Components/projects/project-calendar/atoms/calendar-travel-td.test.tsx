/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import CalendarTravelTd from '@/app/Components/projects/project-calendar/atoms/calendar-travel-td';

describe('CalendarTravelTd', () => {
    it('renders the event name on the start day', () => {
        const props = {
            widthPercentage: '100%',
            eventIndex: 0,
            isStartDay: true,
            remainingDays: 3,
            daysUntilWeekEnd: 7,
            event: { name: 'Test Event' },
        };

        const { getByText } = render(<CalendarTravelTd {...props} />);

        // イベント名が正しく表示されていることを確認
        expect(getByText('Test Event')).toBeInTheDocument();
    });

    it('does not render the event name on non-start days', () => {
        const props = {
            widthPercentage: '100%',
            eventIndex: 0,
            isStartDay: false,
            remainingDays: 3,
            daysUntilWeekEnd: 7,
            event: { name: 'Test Event' },
        };

        const { queryByText } = render(<CalendarTravelTd {...props} />);

        // 非開始日にはイベント名が表示されないことを確認
        expect(queryByText('Test Event')).not.toBeInTheDocument();
    });

    it('applies correct width and style', () => {
        const props = {
            widthPercentage: '50%',
            eventIndex: 1,
            isStartDay: true,
            remainingDays: 3,
            daysUntilWeekEnd: 7,
            event: { name: 'Test Event' },
        };

        const { container } = render(<CalendarTravelTd {...props} />);
        const divElement = container.firstChild as HTMLDivElement;

        // 幅が正しく設定されていることを確認
        expect(divElement).toHaveStyle('width: 50%');

        // スタイルが正しく設定されていることを確認
        expect(divElement).toHaveStyle('top: 36px'); // eventIndexが1の場合、topは16 * 1 + 20 = 36px
        expect(divElement).toHaveStyle('border-top-left-radius: 2px');
        expect(divElement).toHaveStyle('border-bottom-left-radius: 2px');
    });

    it('applies correct border-radius when event ends before week end', () => {
        const props = {
            widthPercentage: '100%',
            eventIndex: 0,
            isStartDay: true,
            remainingDays: 2,
            daysUntilWeekEnd: 3,
            event: { name: 'Test Event' },
        };

        const { container } = render(<CalendarTravelTd {...props} />);
        const divElement = container.firstChild as HTMLDivElement;

        // ボーダーの右側の角が丸くなっていることを確認
        expect(divElement).toHaveStyle('border-top-right-radius: 2px');
        expect(divElement).toHaveStyle('border-bottom-right-radius: 2px');
    });

    it('does not apply border-radius when event does not end before week end', () => {
        const props = {
            widthPercentage: '100%',
            eventIndex: 0,
            isStartDay: true,
            remainingDays: 5,
            daysUntilWeekEnd: 3,
            event: { name: 'Test Event' },
        };

        const { container } = render(<CalendarTravelTd {...props} />);
        const divElement = container.firstChild as HTMLDivElement;

        // ボーダーの右側の角が丸くなっていないことを確認
        expect(divElement).toHaveStyle('border-top-right-radius: 0');
        expect(divElement).toHaveStyle('border-bottom-right-radius: 0');
    });
});
