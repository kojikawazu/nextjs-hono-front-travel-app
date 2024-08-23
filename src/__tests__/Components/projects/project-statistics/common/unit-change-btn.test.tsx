/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnitChangeBtn from '@/app/Components/projects/project-statistics/common/unit-change-btn';

describe('UnitChangeBtn', () => {
    const handleViewModeChange = jest.fn();
    const handleViewModeChangeByProjectId = jest.fn();

    beforeEach(() => {
        handleViewModeChange.mockClear();
        handleViewModeChangeByProjectId.mockClear();
    });

    test('renders buttons with correct text', () => {
        render(
            <UnitChangeBtn
                viewMode="week"
                handleViewModeChange={handleViewModeChange}
                handleViewModeChangeByProjectId={
                    handleViewModeChangeByProjectId
                }
            />
        );

        expect(screen.getByText('週単位')).toBeInTheDocument();
        expect(screen.getByText('月単位')).toBeInTheDocument();
        expect(screen.getByText('年単位')).toBeInTheDocument();
    });

    test('triggers handleViewModeChange when projectId is empty', () => {
        render(
            <UnitChangeBtn
                viewMode="week"
                handleViewModeChange={handleViewModeChange}
                handleViewModeChangeByProjectId={
                    handleViewModeChangeByProjectId
                }
            />
        );

        fireEvent.click(screen.getByText('月単位'));
        expect(handleViewModeChange).toHaveBeenCalledWith('month');
        expect(handleViewModeChangeByProjectId).not.toHaveBeenCalled();

        fireEvent.click(screen.getByText('年単位'));
        expect(handleViewModeChange).toHaveBeenCalledWith('year');
        expect(handleViewModeChangeByProjectId).not.toHaveBeenCalled();
    });

    test('triggers handleViewModeChangeByProjectId when projectId is provided', () => {
        const projectId = '123';

        render(
            <UnitChangeBtn
                viewMode="week"
                handleViewModeChange={handleViewModeChange}
                handleViewModeChangeByProjectId={
                    handleViewModeChangeByProjectId
                }
                projectId={projectId}
            />
        );

        fireEvent.click(screen.getByText('週単位'));
        expect(handleViewModeChange).not.toHaveBeenCalled();
        expect(handleViewModeChangeByProjectId).toHaveBeenCalledWith(
            'week',
            projectId
        );

        fireEvent.click(screen.getByText('月単位'));
        expect(handleViewModeChange).not.toHaveBeenCalled();
        expect(handleViewModeChangeByProjectId).toHaveBeenCalledWith(
            'month',
            projectId
        );
    });

    test('applies correct styles based on viewMode', () => {
        const { rerender } = render(
            <UnitChangeBtn
                viewMode="week"
                handleViewModeChange={handleViewModeChange}
                handleViewModeChangeByProjectId={
                    handleViewModeChangeByProjectId
                }
            />
        );

        expect(screen.getByText('週単位')).toHaveClass(
            'bg-blue-500 text-white'
        );
        expect(screen.getByText('月単位')).toHaveClass('bg-gray-300');
        expect(screen.getByText('年単位')).toHaveClass('bg-gray-300');

        rerender(
            <UnitChangeBtn
                viewMode="month"
                handleViewModeChange={handleViewModeChange}
                handleViewModeChangeByProjectId={
                    handleViewModeChangeByProjectId
                }
            />
        );

        expect(screen.getByText('週単位')).toHaveClass('bg-gray-300');
        expect(screen.getByText('月単位')).toHaveClass(
            'bg-blue-500 text-white'
        );
        expect(screen.getByText('年単位')).toHaveClass('bg-gray-300');

        rerender(
            <UnitChangeBtn
                viewMode="year"
                handleViewModeChange={handleViewModeChange}
                handleViewModeChangeByProjectId={
                    handleViewModeChangeByProjectId
                }
            />
        );

        expect(screen.getByText('週単位')).toHaveClass('bg-gray-300');
        expect(screen.getByText('月単位')).toHaveClass('bg-gray-300');
        expect(screen.getByText('年単位')).toHaveClass(
            'bg-blue-500 text-white'
        );
    });
});
