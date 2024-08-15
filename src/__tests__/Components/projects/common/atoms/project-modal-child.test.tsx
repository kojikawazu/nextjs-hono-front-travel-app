/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Modal from 'react-modal';
import ProjectModalChild from '@/app/Components/projects/common/atoms/project-modal-child';

Modal.setAppElement(document.createElement('div'));

describe('ProjectModalChild', () => {
    const closeModalMock = jest.fn();

    beforeEach(() => {
        closeModalMock.mockClear();
    });

    test('renders the modal with children when open', () => {
        render(
            <ProjectModalChild
                contentLabel="Test Modal"
                isModalOpen={true}
                closeModal={closeModalMock}
            >
                <div>Modal Content</div>
            </ProjectModalChild>
        );

        const modalContent = screen.getByText('Modal Content');
        expect(modalContent).toBeInTheDocument();
    });

    test('does not render the modal when closed', () => {
        render(
            <ProjectModalChild
                contentLabel="Test Modal"
                isModalOpen={false}
                closeModal={closeModalMock}
            >
                <div>Modal Content</div>
            </ProjectModalChild>
        );

        const modalContent = screen.queryByText('Modal Content');
        expect(modalContent).not.toBeInTheDocument();
    });

    test('calls closeModal when the modal is closed', () => {
        render(
            <ProjectModalChild
                contentLabel="Test Modal"
                isModalOpen={true}
                closeModal={closeModalMock}
            >
                <div>Modal Content</div>
            </ProjectModalChild>
        );

        const overlay = document.querySelector('.ReactModal__Overlay');
        if (overlay) {
            fireEvent.click(overlay);
        }

        expect(closeModalMock).toHaveBeenCalledTimes(1);
    });
});
