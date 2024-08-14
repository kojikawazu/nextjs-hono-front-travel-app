import React from 'react';
import { render, act } from '@testing-library/react';
import { useModal } from '@/app/hooks/common/useModal';

describe('useModal', () => {
    const TestComponent = () => {
        const { modalIsOpen, openModal, closeModal } = useModal();
        return (
            <div>
                <span data-testid="modal-status">{modalIsOpen ? 'Open' : 'Closed'}</span>
                <button onClick={openModal}>Open</button>
                <button onClick={closeModal}>Close</button>
            </div>
        );
    };

    test('should initialize with modal closed', () => {
        const { getByTestId } = render(<TestComponent />);
        expect(getByTestId('modal-status').textContent).toBe('Closed');
    });

    test('should open modal', () => {
        const { getByTestId, getByRole } = render(<TestComponent />);
        act(() => {
            getByRole('button', { name: 'Open' }).click();
        });
        expect(getByTestId('modal-status').textContent).toBe('Open');
    });

    test('should close modal', () => {
        const { getByTestId, getByRole } = render(<TestComponent />);
        act(() => {
            getByRole('button', { name: 'Open' }).click();
        });
        act(() => {
            getByRole('button', { name: 'Close' }).click();
        });
        expect(getByTestId('modal-status').textContent).toBe('Closed');
    });
});
