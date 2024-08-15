/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import ProjectModal from '@/app/Components/projects/common/atoms/project-modal';

describe('ProjectModal', () => {
    const mockCloseModal = jest.fn();
    const mockHandleExecute = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders the modal with correct content when currentTravel is provided', () => {
        render(
            <ProjectModal
                modalIsOpen={true}
                closeModal={mockCloseModal}
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
                handleExecute={mockHandleExecute}
            />
        );

        fireEvent.click(screen.getByText('実行'));
        expect(mockHandleExecute).toHaveBeenCalledTimes(1);
    });
});
