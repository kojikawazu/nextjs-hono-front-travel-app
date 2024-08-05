import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';

describe('ProjectTitle', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders the project title', () => {
        const titleText = 'My Project';

        render(<ProjectTitle title={titleText} />);

        const titleElement = screen.getByText(titleText);

        expect(titleElement).not.toBeNull();
        expect(titleElement.tagName.toLowerCase()).toBe('h1');
    });

    test('renders without title', () => {
        render(<ProjectTitle title="" />);
        const titleElement = screen.getByRole('heading');
        expect(titleElement).not.toBeNull();
        expect(titleElement.textContent).toBe('');
    });

    test('renders long project title', () => {
        const longTitle = 'A'.repeat(100);
        render(<ProjectTitle title={longTitle} />);
        const titleElement = screen.getByText(longTitle);
        expect(titleElement).not.toBeNull();
        expect(titleElement.tagName.toLowerCase()).toBe('h1');
    });

    test('applies correct CSS classes', () => {
        const titleText = 'My Project';
        render(<ProjectTitle title={titleText} />);
        const titleElement = screen.getByText(titleText);

        // クラスリストを手動で確認
        const classes = ['text-3xl', 'font-bold', 'text-center', 'p-4'];
        classes.forEach((cls) => {
            expect(titleElement.classList.contains(cls)).toBe(true);
        });
    });
});
