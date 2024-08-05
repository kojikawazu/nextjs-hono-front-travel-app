import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ProjectDetailContent from '@/app/Components/projects/project-detail/project-detail-contents/project-detail-contents';

describe('ProjectDetailContent', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders the project detail label', () => {
        const desc = 'My Project';

        render(<ProjectDetailContent description={desc} isLoading={false} />);

        const labelElement = screen.getByText(desc);

        expect(labelElement).not.toBeNull();
        expect(labelElement.tagName.toLowerCase()).toBe('div');
        expect(labelElement.className).toContain('text-gray-400');
    });

    test('renders the project detail label empty', () => {
        const desc = '';

        render(<ProjectDetailContent description={desc} isLoading={false} />);

        const labelElement = screen.getByText((content, element) => {
            return (
                element !== null &&
                element.tagName.toLowerCase() === 'div' &&
                element.className.includes('text-gray-400') &&
                content === ''
            );
        });

        expect(labelElement).not.toBeNull();
        if (labelElement) {
            expect(labelElement.tagName.toLowerCase()).toBe('div');
            expect(labelElement.className).toContain('text-gray-400');
        }
    });

    test('renders the project loading', () => {
        const loadingLabel = 'Loading...';

        render(<ProjectDetailContent description={''} isLoading={true} />);

        const labelElement = screen.getByText(loadingLabel);

        expect(labelElement).not.toBeNull();
        expect(labelElement?.tagName.toLowerCase()).toBe('div');
    });
});
