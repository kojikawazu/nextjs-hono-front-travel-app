import React from 'react';

interface ProjectListDataProps {
    name: string;
    description: string;
};

/**
 * プロジェクトリストデータ
 * @param name
 * @param description
 * @returns JSX
 */
const ProjectListData = ({
    name,
    description,
}: ProjectListDataProps) => {
    return (
        <div className="p-4 bg-green-100 border border-green-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h4 className="text-lg font-semibold mb-2 text-green-800">{name}</h4>
            <p className="text-green-700">{description || "説明なし"}</p>
        </div>
    );
}

export default ProjectListData;