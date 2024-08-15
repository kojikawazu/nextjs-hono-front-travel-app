import React from 'react';
import Modal from 'react-modal';

interface ProjectModalChildProps {
    contentLabel: string;
    isModalOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
}

/**
 * プロジェクトモーダル子コンポーネント
 * @param contentLabel
 * @param isModalOpen
 * @param closeModal
 * @param children
 * @returns JSX
 */
const ProjectModalChild = ({
    contentLabel,
    isModalOpen,
    closeModal,
    children,
}: ProjectModalChildProps) => {
    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel={contentLabel}
            className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto my-32"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            {children}
        </Modal>
    );
};

export default ProjectModalChild;
