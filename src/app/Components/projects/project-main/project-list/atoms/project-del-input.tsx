import React from 'react';

interface ProjectDelInputProps {
    projectId: string;
    className?: string;
    handleCheckboxChange: (projectId: string) => void;
    selectedDelProjects: string[];
}

/**
 * プロジェクト削除チェックボックス
 * @param projectId
 * @param className
 * @param handleCheckboxChange
 * @param selectedDelProjects
 * @returns JSX
 */
const ProjectDelInput = ({
    projectId,
    className = '',
    handleCheckboxChange,
    selectedDelProjects,
}: ProjectDelInputProps) => {
    return (
        <input
            type="checkbox"
            className={className}
            onChange={() => handleCheckboxChange(projectId)}
            checked={selectedDelProjects.includes(projectId)}
        />
    );
};

export default ProjectDelInput;
