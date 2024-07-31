import React from 'react';

interface ProjectDetailLoadingProps {
    label: string;
};

/**
 * プロジェクト詳細ローディング
 * @param label
 * @returns JSX
 */
const ProjectDetailLoading = ({
    label,
}: ProjectDetailLoadingProps) => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-2xl font-bold text-gray-400">{label}</div>
        </div>
    );
}

export default ProjectDetailLoading;