/* eslint-disable no-undef */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';

describe('ProjectDetailLoading', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders the project label', () => {
        const labelText = 'My Project';

        render(<ProjectLoading label={labelText} />);

        const labelElement = screen.getByText(labelText);

        expect(labelElement).not.toBeNull();
        expect(labelElement.tagName.toLowerCase()).toBe('div');
    });

    test('renders without label', () => {
        render(<ProjectLoading label="" />);
        const labelElement = document.querySelector(
            '.text-2xl.font-bold.text-gray-400'
        );
        expect(labelElement).not.toBeNull();
        if (labelElement) {
            expect(labelElement.textContent).toBe('');
        }
    });

    test('renders long project label', () => {
        const longLabel = 'A'.repeat(100);
        render(<ProjectLoading label={longLabel} />);
        const labelElement = screen.getByText(longLabel);
        expect(labelElement).not.toBeNull();
        expect(labelElement.tagName.toLowerCase()).toBe('div');
    });

    test('applies correct CSS classes', () => {
        const labelText = 'My Project';
        render(<ProjectLoading label={labelText} />);
        const labelElement = screen.getByText(labelText);

        // クラスリストを手動で確認
        const classes = ['text-2xl', 'font-bold', 'text-gray-400'];
        classes.forEach((cls) => {
            expect(labelElement.classList.contains(cls)).toBe(true);
        });
    });
});
