import React from 'react';
import Modal from 'react-modal';
import { Travel } from "@prisma/client";

interface ProjectModalProps {
    modalIsOpen: boolean;
    closeModal: () => void;
    currentTravel?: Travel | null;
    handleExecute: () => void;
    contentLabel?: string;
    confirmText?: string;
    cancelText?: string;
    okText?: string;
};

/**
 * プロジェクトモーダル
 * @param modalIsOpen
 * @param closeModal
 * @param currentTravel
 * @param handleExecute
 * @param contentLabel
 * @param confirmText
 * @param cancelText
 * @param okText
 * @returns JSX
 */
const ProjectModal = ({
    modalIsOpen,
    closeModal,
    currentTravel,
    handleExecute,
    contentLabel = "確認",
    confirmText = "本当によろしいですか？",
    cancelText = "キャンセル",
    okText = "実行",
}: ProjectModalProps) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel={contentLabel}
            className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto my-32"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
            {currentTravel && (
                <>
                    <h2 className="text-xl font-semibold mb-4">{contentLabel}</h2>
                    <p>{confirmText}</p>
                    <div className="flex justify-end mt-4">
                        <button onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-300 rounded">{cancelText}</button>
                        <button onClick={handleExecute} className="px-4 py-2 bg-red-500 text-white rounded">{okText}</button>
                    </div>
                </>
            )}
        </Modal>
    );
}

export default ProjectModal;