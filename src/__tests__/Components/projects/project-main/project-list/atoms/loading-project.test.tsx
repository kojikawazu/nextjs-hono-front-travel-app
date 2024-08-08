/* eslint-disable no-undef */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import LoadingProject from '@/app/Components/projects/project-main/project-list/atoms/loading-project';

describe('LoadingProject', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders without crashing', () => {
        const { container } = render(<LoadingProject />);
        const spinner = container.querySelector('.animate-spin');
        expect(spinner).not.toBeNull();
    });

    test('displays the loading spinner with correct classes', () => {
        const { container } = render(<LoadingProject />);
        const spinner = container.querySelector('.animate-spin');
        expect(spinner).toHaveProperty(
            'className',
            'animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900'
        );
    });
});
