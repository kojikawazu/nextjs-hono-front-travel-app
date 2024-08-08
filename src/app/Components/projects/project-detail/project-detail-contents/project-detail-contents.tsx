import React from 'react';

interface ProjectDetailContentProps {
    description: string;
}

/**
 * プロジェクト詳細コンテンツ
 * @param description
 * @returns JSX
 */
const ProjectDetailContent = ({ description }: ProjectDetailContentProps) => {
    return (
        <div className="h-full">
            <div className="p-6">
                <div className="text-sm text-gray-400">{description}</div>
            </div>
        </div>
    );
};

export default ProjectDetailContent;
