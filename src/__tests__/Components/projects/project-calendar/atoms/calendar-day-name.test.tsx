/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';

import CalendarDayName from '@/app/Components/projects/project-calendar/atoms/calendar-day-name';

describe('CalendarDayName', () => {
    it('renders all day names correctly', () => {
        const { getByText } = render(<CalendarDayName />);

        // 曜日名が正しくレンダリングされることを確認する
        const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
        dayNames.forEach((day) => {
            expect(getByText(day)).toBeInTheDocument();
        });
    });
});
