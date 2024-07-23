import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, beforeAll, afterEach, jest } from "bun:test";
import ProjectListTitle from '@/app/Components/projects/project-main/project-list/atoms/project-list-title';

describe('ProjectListTitle', () => {

    beforeAll(() => {
        jest.clearAllMocks();
    });

    afterEach(() => {
        cleanup();
    });

    test('renders the project list title', () => {
        render(<ProjectListTitle />);
        const titleElement = screen.getByText('プロジェクトリスト');
        expect(titleElement).not.toBeNull();
        expect(titleElement.tagName.toLowerCase()).toBe('h3');
    });

    test('has correct classes applied', () => {
        render(<ProjectListTitle />);
        const titleElement = screen.getByText('プロジェクトリスト');
        expect(titleElement.classList.contains('text-2xl')).toBe(true);
        expect(titleElement.classList.contains('font-bold')).toBe(true);
        expect(titleElement.classList.contains('text-center')).toBe(true);
        expect(titleElement.classList.contains('p-4')).toBe(true);
    });
});
