import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach } from "bun:test";
import ProjectCreateButton from '@/app/Components/projects/project-main/project-create/atoms/project-create-button';

describe('ProjectCreateButton', () => {
    afterEach(() => {
        cleanup();
    });

    test('renders with the correct label', () => {
        render(<ProjectCreateButton label="Create Project" type="button" />);
        const buttonElement = screen.getByText('Create Project');
        expect(buttonElement).not.toBeNull();
        expect(buttonElement.tagName.toLowerCase()).toBe('button');
    });

    test('has the correct type attribute', () => {
        render(<ProjectCreateButton label="Create Project" type="submit" />);
        const buttonElement = screen.getByText('Create Project');
        expect(buttonElement).not.toBeNull();
        expect(buttonElement.getAttribute('type')).toBe('submit');
    });
});