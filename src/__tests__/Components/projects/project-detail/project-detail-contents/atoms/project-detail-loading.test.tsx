import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ProjectDetailLoading from '@/app/Components/projects/project-detail/project-detail-contents/atoms/project-detail-loading';

describe('ProjectDetailLoading', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders the project detail label', () => {
        const labelText = 'My Project';

        render(<ProjectDetailLoading label={labelText} />);

        const labelElement = screen.getByText(labelText);

        expect(labelElement).not.toBeNull();
        expect(labelElement.tagName.toLowerCase()).toBe('div');
    });

    test('renders without label', () => {
        render(<ProjectDetailLoading label="" />);
        const labelElement = document.querySelector(
            '.text-2xl.font-bold.text-gray-400'
        );
        expect(labelElement).not.toBeNull();
        if (labelElement) {
            expect(labelElement.textContent).toBe('');
        }
    });

    test('renders long project detail label', () => {
        const longLabel = 'A'.repeat(100);
        render(<ProjectDetailLoading label={longLabel} />);
        const labelElement = screen.getByText(longLabel);
        expect(labelElement).not.toBeNull();
        expect(labelElement.tagName.toLowerCase()).toBe('div');
    });

    test('applies correct CSS classes', () => {
        const labelText = 'My Project';
        render(<ProjectDetailLoading label={labelText} />);
        const labelElement = screen.getByText(labelText);

        // クラスリストを手動で確認
        const classes = ['text-2xl', 'font-bold', 'text-gray-400'];
        classes.forEach((cls) => {
            expect(labelElement.classList.contains(cls)).toBe(true);
        });
    });
});
