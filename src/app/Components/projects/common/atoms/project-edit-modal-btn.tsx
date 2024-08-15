import React from 'react';
import { FiEdit } from 'react-icons/fi';

interface ProjectEditModalBtnProps {
    id: string;
    className?: string;
    handleOpen: () => void;
}

/**
 * 更新モーダルボタン
 * @param id
 * @param className
 * @param handleOpen
 * @returns JSX
 */
const ProjectEditModalBtn = ({
    id,
    className = '',
    handleOpen,
}: ProjectEditModalBtnProps) => {
    return (
        <button
            onClick={(e) => {
                e.stopPropagation();
                handleOpen();
            }}
            className={`text-blue-500 hover:text-blue-700 ${className}`}
            aria-label={`update-${id}`}
        >
            <FiEdit size={24} />
        </button>
    );
};

export default ProjectEditModalBtn;
