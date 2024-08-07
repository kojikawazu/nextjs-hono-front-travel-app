/* eslint-disable no-undef */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import TravelTotal from '@/app/Components/projects/project-detail/travel-total/travel-total';

describe('TravelTotal', () => {
    afterEach(() => {
        cleanup();
    });

    test('should render total amount correctly', () => {
        const total = 123456;

        render(<TravelTotal total={total} />);

        expect(
            screen.queryByText(`合計金額: ¥${total.toLocaleString()}`)
        ).not.toBeNull();
    });

    test('should format total amount correctly with commas', () => {
        const total = 1234567;

        render(<TravelTotal total={total} />);

        expect(
            screen.queryByText(`合計金額: ¥${total.toLocaleString()}`)
        ).not.toBeNull();
    });

    test('should render zero amount correctly', () => {
        const total = 0;

        render(<TravelTotal total={total} />);

        expect(
            screen.queryByText(`合計金額: ¥${total.toLocaleString()}`)
        ).not.toBeNull();
    });

    test('should handle large numbers correctly', () => {
        const total = 123456789012345;

        render(<TravelTotal total={total} />);

        expect(
            screen.queryByText(`合計金額: ¥${total.toLocaleString()}`)
        ).not.toBeNull();
    });
});
