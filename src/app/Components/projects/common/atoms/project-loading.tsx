import React from 'react';

interface ProjectLoadingProps {
    label: string;
}

/**
 * プロジェクトローディング
 * @param label
 * @returns JSX
 */
const ProjectLoading = ({ label }: ProjectLoadingProps) => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-2xl font-bold text-gray-400">{label}</div>
        </div>
    );
};

export default ProjectLoading;
