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

        const liElement = screen.getByText(labelText);

        expect(liElement).not.toBeNull();
        expect(liElement.tagName.toLowerCase()).toBe('li');
    });

    test('renders without label', () => {
        render(<SideBarItem label="" />);
        const liElement = screen.getByRole('listitem');
        expect(liElement).not.toBeNull();
        expect(liElement.textContent).toBe('');
    });

    test('renders long side bar label', () => {
        const longLabel = 'A'.repeat(100);
        render(<SideBarItem label={longLabel} />);
        const liElement = screen.getByText(longLabel);
        expect(liElement).not.toBeNull();
        expect(liElement.tagName.toLowerCase()).toBe('li');
    });

    test('applies correct CSS classes', () => {
        const labelText = 'My Label';
        render(<SideBarItem label={labelText} />);
        const liElement = screen.getByText(labelText);
        console.log(liElement.outerHTML);

        const classes = ['p-2', 'border-b', 'border-blue-400'];
        classes.forEach((cls) => {
            expect(liElement.classList.contains(cls)).toBe(true);
        });
    });
});
