import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Travel } from '@prisma/client';
import ProjectModal from '@/app/Components/projects/common/atoms/project-modal';

describe('ProjectModal', () => {
    const mockCloseModal = jest.fn();
    const mockHandleExecute = jest.fn();
    const currentTravel: Travel = {
        id: '1',
        name: 'Sample Travel',
        description: 'This is a sample travel.',
        amount: 1000,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: '1',
        projectId: '1',
        categoryId: '1',
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the modal with correct content when currentTravel is provided', () => {
        render(
            <ProjectModal
                modalIsOpen={true}
                closeModal={mockCloseModal}
                currentTravel={currentTravel}
                handleExecute={mockHandleExecute}
            />
        );

        expect(screen.getByText('確認')).toBeInTheDocument();
        expect(screen.getByText('本当によろしいですか？')).toBeInTheDocument();
        expect(screen.getByText('キャンセル')).toBeInTheDocument();
        expect(screen.getByText('実行')).toBeInTheDocument();
    });

    test('calls closeModal when cancel button is clicked', () => {
        render(
            <ProjectModal
                modalIsOpen={true}
                closeModal={mockCloseModal}
                currentTravel={currentTravel}
                handleExecute={mockHandleExecute}
            />
        );

        fireEvent.click(screen.getByText('キャンセル'));
        expect(mockCloseModal).toHaveBeenCalledTimes(1);
    });

    test('calls handleExecute when execute button is clicked', () => {
        render(
            <ProjectModal
                modalIsOpen={true}
                closeModal={mockCloseModal}
                currentTravel={currentTravel}
                handleExecute={mockHandleExecute}
            />
        );

        fireEvent.click(screen.getByText('実行'));
        expect(mockHandleExecute).toHaveBeenCalledTimes(1);
    });

    test('does not render the modal content when currentTravel is not provided', () => {
        render(
            <ProjectModal
                modalIsOpen={true}
                closeModal={mockCloseModal}
                handleExecute={mockHandleExecute}
            />
        );

        expect(screen.queryByText('確認')).not.toBeInTheDocument();
        expect(
            screen.queryByText('本当によろしいですか？')
        ).not.toBeInTheDocument();
        expect(screen.queryByText('キャンセル')).not.toBeInTheDocument();
        expect(screen.queryByText('実行')).not.toBeInTheDocument();
    });
});
