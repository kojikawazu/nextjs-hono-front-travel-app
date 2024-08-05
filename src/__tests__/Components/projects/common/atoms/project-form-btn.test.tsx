import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import ProjectFormBtn from '@/app/Components/projects/common/atoms/project-form-btn';

describe('ProjectFormBtn', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders with the correct label', () => {
        render(
            <ProjectFormBtn
                label="Create Project"
                type="button"
                className="mb-4"
            />
        );
        const buttonElement = screen.getByText('Create Project');
        expect(buttonElement).not.toBeNull();
        expect(buttonElement.tagName.toLowerCase()).toBe('button');
        const classes = ['mb-4'];
        classes.forEach((cls) => {
            expect(buttonElement.classList.contains(cls)).toBe(true);
        });
    });

    test('has the correct type attribute', () => {
        render(
            <ProjectFormBtn
                label="Create Project"
                type="submit"
                className="mb-4"
            />
        );
        const buttonElement = screen.getByText('Create Project');
        expect(buttonElement).not.toBeNull();
        expect(buttonElement.getAttribute('type')).toBe('submit');
        const classes = ['mb-4'];
        classes.forEach((cls) => {
            expect(buttonElement.classList.contains(cls)).toBe(true);
        });
    });
});
