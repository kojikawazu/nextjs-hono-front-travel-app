import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectDelModalBtn from '@/app/Components/projects/common/atoms/project-del-modal-btn';

describe('ProjectDelModalBtn', () => {
    const handleOpenMock = jest.fn();

    beforeEach(() => {
        handleOpenMock.mockClear();
    });

    test('renders the button with the correct aria-label', () => {
        const { container } = render(<ProjectDelModalBtn id="test-id" handleOpen={handleOpenMock} />);
        const button = screen.getByRole('button', { name: /delete-test-id/i });
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('text-red-500 hover:text-red-700');
        expect(container.querySelector('svg')).toBeInTheDocument();
    });

    test('calls handleOpen when the button is clicked', () => {
        render(<ProjectDelModalBtn id="test-id" handleOpen={handleOpenMock} />);
        const button = screen.getByRole('button', { name: /delete-test-id/i });
        fireEvent.click(button);
        expect(handleOpenMock).toHaveBeenCalledTimes(1);
    });

    test('stops event propagation when the button is clicked', () => {
        const stopPropagationMock = jest.fn();
        render(
            <button onClick={stopPropagationMock}>
                <ProjectDelModalBtn id="test-id" handleOpen={handleOpenMock} />
            </button>
        );
        const button = screen.getByRole('button', { name: /delete-test-id/i });
        fireEvent.click(button);
        expect(stopPropagationMock).not.toHaveBeenCalled();
        expect(handleOpenMock).toHaveBeenCalledTimes(1);
    });
});
