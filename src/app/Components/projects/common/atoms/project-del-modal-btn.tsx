import React from 'react';
import { FiTrash2 } from "react-icons/fi";

interface ProjectDelModalBtnProps {
    id: string;
    handleOpen: () => void;
};

/**
 * プロジェクト削除モーダルボタン
 * @param id
 * @param handleOpen
 * @returns JSX
 */
const ProjectDelModalBtn = ({
    id,
    handleOpen,
}: ProjectDelModalBtnProps) => {
    return (
        <button 
            onClick={(e) => { 
                e.stopPropagation(); 
                handleOpen(); 
            }} 
            className="text-red-500 hover:text-red-700" 
            aria-label={`delete-${id}`}
        >
            <FiTrash2 size={24} />
        </button>
    );
}

export default ProjectDelModalBtn;