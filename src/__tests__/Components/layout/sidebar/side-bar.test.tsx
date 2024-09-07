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

    const mockProjectStatistics: Project[] = [
        {
            id: '3',
            name: 'Project Statistics 1',
            description: 'Statistics Description 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user1',
        },
        {
            id: '4',
            name: 'Project Statistics 2',
            description: 'Statistics Description 2',
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user2',
        },
    ];

    test('renders SideBar with correct items', () => {
        render(
            <SideBar
                projectSCList={mockProjects}
                projectStatisticsSCList={mockProjectStatistics}
            />
        );

        expect(screen.getByText('全プロジェクト')).toBeTruthy();
        expect(screen.getByText('プロジェクト')).toBeTruthy();
        expect(screen.getByText('全プロジェクト統計')).toBeTruthy();
        expect(screen.getByText('プロジェクト統計')).toBeTruthy();
        expect(screen.getByText('Project 1')).toBeTruthy();
        expect(screen.getByText('Project 2')).toBeTruthy();
        expect(screen.getByText('Project Statistics 1')).toBeTruthy();
        expect(screen.getByText('Project Statistics 2')).toBeTruthy();
    });

    test('renders links with correct href attributes', () => {
        render(
            <SideBar
                projectSCList={mockProjects}
                projectStatisticsSCList={mockProjectStatistics}
            />
        );

        const projectLink = screen.getByText('全プロジェクト').closest('a');
        const project1Link = screen.getByText('Project 1').closest('a');
        const project2Link = screen.getByText('Project 2').closest('a');
        const projectStatisticsLink = screen
            .getByText('全プロジェクト統計')
            .closest('a');
        const projectStatistics1Link = screen
            .getByText('Project Statistics 1')
            .closest('a');
        const projectStatistics2Link = screen
            .getByText('Project Statistics 2')
            .closest('a');

        expect(projectLink).toHaveAttribute('href', '/projects');
        expect(project1Link).toHaveAttribute('href', '/projects/1');
        expect(project2Link).toHaveAttribute('href', '/projects/2');
        expect(projectStatisticsLink).toHaveAttribute(
            'href',
            '/projects/statistics'
        );
        expect(projectStatistics1Link).toHaveAttribute(
            'href',
            '/projects/statistics/3'
        );
        expect(projectStatistics2Link).toHaveAttribute(
            'href',
            '/projects/statistics/4'
        );
    });

    test('has the correct styles applied', () => {
        const { container } = render(
            <SideBar
                projectSCList={mockProjects}
                projectStatisticsSCList={mockProjectStatistics}
            />
        );

        const firstChild = container.firstChild as HTMLElement;
        expect(firstChild).toBeTruthy();
        if (firstChild) {
            expect(firstChild.className.includes('bg-blue-600')).toBe(true);
            expect(firstChild.className.includes('h-screen')).toBe(true);
        }
    });
});
