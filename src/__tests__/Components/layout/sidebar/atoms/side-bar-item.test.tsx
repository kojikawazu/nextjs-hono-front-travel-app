/* eslint-disable no-undef */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import SideBarItem from '@/app/Components/layout/sidebar/atoms/side-bar-item';

describe('SideBarItem', () => {
    beforeAll(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    test('renders the side bar item', () => {
        const labelText = 'My Label';

        render(<SideBarItem label={labelText} />);

        const divElement = screen.getByText(labelText).closest('div');
        expect(divElement).not.toBeNull();

        if (divElement) {
            expect(divElement.tagName.toLowerCase()).toBe('div');
        }
    });

    test('renders without label', () => {
        render(<SideBarItem label="" />);
        const divElement = screen.getByTestId('sidebar-item');
        expect(divElement).not.toBeNull();
        expect(divElement.textContent).toBe('');
    });

    test('renders long side bar label', () => {
        const longLabel = 'A'.repeat(100);
        render(<SideBarItem label={longLabel} />);
        const divElement = screen.getByText(longLabel).closest('div');
        expect(divElement).not.toBeNull();

        if (divElement) {
            expect(divElement.tagName.toLowerCase()).toBe('div');
        }
    });

    test('applies correct CSS classes', () => {
        const labelText = 'My Label';
        render(<SideBarItem label={labelText} />);
        const divElement = screen.getByText(labelText).closest('div');
        expect(divElement).not.toBeNull();

        if (divElement) {
            const classes = [
                'flex',
                'items-center',
                'space-x-2',
                'p-2',
                'hover:bg-blue-400',
                'cursor-pointer',
                'transition-all',
                'duration-200',
            ];

            classes.forEach((cls) => {
                expect(divElement).toHaveClass(cls);
            });
        }
    });

    test('applies additional className correctly', () => {
        const labelText = 'My Label';
        const additionalClass = 'extra-class';

        render(<SideBarItem label={labelText} className={additionalClass} />);
        const divElement = screen.getByText(labelText).closest('div');
        expect(divElement).not.toBeNull();

        if (divElement) {
            const baseClasses = [
                'flex',
                'items-center',
                'space-x-2',
                'p-2',
                'hover:bg-blue-400',
                'cursor-pointer',
                'transition-all',
                'duration-200',
            ];

            baseClasses.forEach((cls) => {
                expect(divElement).toHaveClass(cls);
            });

            expect(divElement).toHaveClass(additionalClass);
        }
    });
});
