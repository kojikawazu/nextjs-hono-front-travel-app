/* eslint-disable no-undef */
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { Project } from '@prisma/client';
import SideBar from '@/app/Components/layout/sidebar/side-bar';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('SideBar', () => {
    afterEach(() => {
        cleanup();
    });

    const mockProjects: Project[] = [
        {
            id: '1',
            name: 'Project 1',
            description: 'Description 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user1',
        },
        {
            id: '2',
            name: 'Project 2',
            description: 'Description 2',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user2',
        },
    ];

    test('renders SideBar with correct items', () => {
        render(<SideBar projectSCList={mockProjects} />);

        expect(screen.getByText('Projects')).toBeTruthy();
        expect(screen.getByText('Menu Item 2')).toBeTruthy();
        expect(screen.getByText('Menu Item 3')).toBeTruthy();
        expect(screen.getByText('Project 1')).toBeTruthy();
        expect(screen.getByText('Project 2')).toBeTruthy();
    });

    test('renders links with correct href attributes', () => {
        render(<SideBar projectSCList={mockProjects} />);

        const projectLink = screen.getByText('Projects').closest('a');
        const project1Link = screen.getByText('Project 1').closest('a');
        const project2Link = screen.getByText('Project 2').closest('a');

        expect(projectLink).toHaveAttribute('href', '/projects');
        expect(project1Link).toHaveAttribute('href', '/projects/1');
        expect(project2Link).toHaveAttribute('href', '/projects/2');
    });

    test('has the correct styles applied', () => {
        const { container } = render(<SideBar projectSCList={mockProjects} />);

        const firstChild = container.firstChild as HTMLElement;
        expect(firstChild).toBeTruthy();
        if (firstChild) {
            expect(firstChild.className.includes('bg-blue-300')).toBe(true);
            expect(firstChild.className.includes('h-screen')).toBe(true);
        }
    });
});
