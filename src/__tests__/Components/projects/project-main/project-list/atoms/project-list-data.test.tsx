import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ProjectListData from '@/app/Components/projects/project-main/project-list/atoms/project-list-data';

describe('ProjectListData', () => {

    afterEach(() => {
        cleanup();
    });

    test('renders the project name and description', () => {
        render(
            <ProjectListData projectId="1" name="Test Project" description="Test Description" />
        );
        const nameElement = screen.getByText('Test Project');
        const descriptionElement = screen.getByText('Test Description');
        
        expect(nameElement).not.toBeNull();
        expect(descriptionElement).not.toBeNull();
    });

    test('renders default description when none is provided', () => {
        render(
            <ProjectListData projectId="1" name="Test Project" description="" />
        );
        const descriptionElement = screen.getByText('説明なし');
        
        expect(descriptionElement).not.toBeNull();
    });

    test('has correct link to project page', () => {
        render(
            <ProjectListData projectId="1" name="Test Project" description="Test Description" />
        );
        const linkElement = screen.getByRole('link');
        
        expect(linkElement).not.toBeNull();
        expect(linkElement.getAttribute('href')).toBe('/projects/1');
    });

    test('wrapper div has the correct classes', () => {
        render(
            <ProjectListData projectId="1" name="Test Project" description="Test Description" />
        );
        const wrapperDiv = document.querySelector('.p-4.mb-2.bg-green-100.border.border-green-300.rounded-lg.shadow-sm.hover\\:shadow-md.transition-shadow.duration-300');
        
        expect(wrapperDiv).not.toBeNull();
    });
});
