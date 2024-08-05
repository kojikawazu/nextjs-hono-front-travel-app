import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectEditModalBtn from '@/app/Components/projects/common/atoms/project-edit-modal-btn';

describe('ProjectEditModalBtn', () => {
    const handleOpenMock = jest.fn();

    beforeEach(() => {
        handleOpenMock.mockClear();
    });

    test('renders the button with the correct aria-label', () => {
        const { container } = render(<ProjectEditModalBtn id="test-id" handleOpen={handleOpenMock} />);
        const button = screen.getByRole('button', { name: /update-test-id/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('text-blue-500 hover:text-blue-700');
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    test('calls handleOpen when the button is clicked', () => {
        render(<ProjectEditModalBtn id="test-id" handleOpen={handleOpenMock} />);
        const button = screen.getByRole('button', { name: /update-test-id/i });
        fireEvent.click(button);
        expect(handleOpenMock).toHaveBeenCalledTimes(1);
    });

    test('stops event propagation when the button is clicked', () => {
        const stopPropagationMock = jest.fn();
        render(
            <button onClick={stopPropagationMock}>
                <ProjectEditModalBtn id="test-id" handleOpen={handleOpenMock} />
            </button>
        );
        const button = screen.getByRole('button', { name: /update-test-id/i });
        fireEvent.click(button);
        expect(stopPropagationMock).not.toHaveBeenCalled();
        expect(handleOpenMock).toHaveBeenCalledTimes(1);
    });
});
