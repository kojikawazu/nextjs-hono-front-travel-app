import React from 'react';
import Link from 'next/link';

interface ProjectListDataProps {
    projectId: string;
    name: string;
    description: string;
}

/**
 * プロジェクトリストデータ
 * @param name
 * @param description
 * @returns JSX
 */
const ProjectListData = ({
    projectId,
    name,
    description,
}: ProjectListDataProps) => {
    return (
        <Link href={`/projects/${projectId}`} className="w-full">
            <div className="p-4 mb-2 bg-green-100 border border-green-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
                <h4 className="text-lg font-semibold mb-2 text-green-800">
                    {name}
                </h4>
                <p className="text-green-700">{description || '説明なし'}</p>
            </div>
        </Link>
    );
};

export default ProjectListData;
