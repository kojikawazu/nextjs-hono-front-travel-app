import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import NotProjectData from '@/app/Components/projects/project-main/project-list/atoms/not-project-data';

describe('NotProjectData', () => {

    afterEach(() => {
        cleanup();
    });

    test('renders the "No Projects" message', () => {
        render(<NotProjectData />);
        const messageElement = screen.getByText('プロジェクトがありません');
        expect(messageElement).not.toBeNull();
        expect(messageElement.textContent).toBe('プロジェクトがありません');
    });

    test('wrapper div has the correct classes', () => {
        render(<NotProjectData />);
        const wrapperDiv = document.querySelector('.flex-grow.flex.justify-center.items-center.text-gray-500');
        expect(wrapperDiv).not.toBeNull();
    });
});
