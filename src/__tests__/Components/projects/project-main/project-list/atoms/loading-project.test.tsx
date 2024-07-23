import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { describe, test, expect, afterEach } from "bun:test";
import LoadingProject from '@/app/Components/projects/project-main/project-list/atoms/loading-project';

describe('LoadingProject', () => {

    afterEach(() => {
        cleanup();
    });

    test('renders the loading indicator', () => {
        render(<LoadingProject />);
        const loadingDiv = document.querySelector('.animate-spin.rounded-full.h-12.w-12.border-b-2.border-gray-900');
        expect(loadingDiv).not.toBeNull();
    });

    test('wrapper div has the correct classes', () => {
        render(<LoadingProject />);
        const wrapperDiv = document.querySelector('.flex-grow.flex.justify-center.items-center');
        expect(wrapperDiv).not.toBeNull();
    });
});
