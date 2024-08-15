/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectDelInput from '@/app/Components/projects/project-main/project-list/atoms/project-del-input';

describe('ProjectDelInput', () => {
    const handleCheckboxChangeMock = jest.fn();

    beforeEach(() => {
        handleCheckboxChangeMock.mockClear();
    });

    test('renders the checkbox with the correct className', () => {
        render(
            <ProjectDelInput
                projectId="project1"
                className="custom-class"
                handleCheckboxChange={handleCheckboxChangeMock}
                selectedDelProjects={[]}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveClass('custom-class');
    });

    test('checkbox is checked when projectId is in selectedDelProjects', () => {
        render(
            <ProjectDelInput
                projectId="project1"
                className="custom-class"
                handleCheckboxChange={handleCheckboxChangeMock}
                selectedDelProjects={['project1']}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeChecked();
    });

    test('checkbox is not checked when projectId is not in selectedDelProjects', () => {
        render(
            <ProjectDelInput
                projectId="project1"
                className="custom-class"
                handleCheckboxChange={handleCheckboxChangeMock}
                selectedDelProjects={['project2']}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).not.toBeChecked();
    });

    test('calls handleCheckboxChange with the correct projectId when checkbox is clicked', () => {
        render(
            <ProjectDelInput
                projectId="project1"
                className="custom-class"
                handleCheckboxChange={handleCheckboxChangeMock}
                selectedDelProjects={[]}
            />
        );

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        expect(handleCheckboxChangeMock).toHaveBeenCalledTimes(1);
        expect(handleCheckboxChangeMock).toHaveBeenCalledWith('project1');
    });
});
