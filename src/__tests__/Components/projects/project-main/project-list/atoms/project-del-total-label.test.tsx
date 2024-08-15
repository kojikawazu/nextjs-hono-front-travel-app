/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectDelTotalLabel from '@/app/Components/projects/project-main/project-list/atoms/project-del-total-label';

describe('ProjectDelTotalLabel', () => {
    const handleDeleteMock = jest.fn();

    beforeEach(() => {
        handleDeleteMock.mockClear();
    });

    test('renders the correct delete total label', () => {
        render(
            <ProjectDelTotalLabel
                selectedDelSum={3}
                handleDelete={handleDeleteMock}
            />
        );

        const label = screen.getByText(/削除合計：3件/);
        expect(label).toBeInTheDocument();
    });

    test('calls handleDelete when the delete button is clicked', () => {
        render(
            <ProjectDelTotalLabel
                selectedDelSum={3}
                handleDelete={handleDeleteMock}
            />
        );

        const deleteButton = screen.getByRole('button', { name: '削除' });
        fireEvent.click(deleteButton);

        expect(handleDeleteMock).toHaveBeenCalledTimes(1);
    });

    test('renders the delete button with correct class', () => {
        render(
            <ProjectDelTotalLabel
                selectedDelSum={3}
                handleDelete={handleDeleteMock}
            />
        );

        const deleteButton = screen.getByRole('button', { name: '削除' });
        expect(deleteButton).toHaveClass(
            'bg-black text-white px-4 py-2 rounded-lg'
        );
    });
});
