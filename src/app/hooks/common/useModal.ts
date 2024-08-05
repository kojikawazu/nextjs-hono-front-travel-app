import { useState } from 'react';

/**
 * モーダルカスタムhooks
 * @returns モーダルカスタムhooks
 */
export const useModal = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return {
        modalIsOpen,
        openModal,
        closeModal,
    };
};
