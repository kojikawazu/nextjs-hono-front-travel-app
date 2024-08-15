'use client';

import React from 'react';
import { Project } from '@prisma/client';

import ProjectListData from '@/app/Components/projects/project-main/project-list/atoms/project-list-data';
import NotProjectData from '@/app/Components/projects/project-main/project-list/atoms/not-project-data';
import ProjectListTitle from '@/app/Components/projects/project-main/project-list/atoms/project-list-title';

interface ProjectListProps {
    projectList: Project[];
    selectedDelProjects: string[];
    handleDelete: () => void;
    handleCheckboxChange: (id: string) => void;
}

/**
 * プロジェクトリスト
 * @param projectList
 * @param selectedProjects
 * @param handleDelete
 * @param handleCheckboxChange
 * @returns JSX
 */
const ProjectList = ({
    projectList,
    selectedDelProjects,
    handleDelete,
    handleCheckboxChange,
}: ProjectListProps) => {
    return (
        <div className="flex flex-col h-full">
            <ProjectListTitle />

            <div className="flex justify-between items-center p-4">
                <span className="px-2">
                    削除合計：{selectedDelProjects.length}件
                </span>
                <button
                    onClick={handleDelete}
                    className="bg-black text-white px-4 py-2 rounded-lg"
                >
                    削除
                </button>
            </div>

            {projectList.length === 0 ? (
                <NotProjectData />
            ) : (
                <div className="space-y-4 p-4 overflow-y-auto scrollbar-visible">
                    {projectList.map((project) => (
                        <div key={project.id} className="flex">
                            <input
                                type="checkbox"
                                className="mr-4"
                                onChange={() =>
                                    handleCheckboxChange(project.id)
                                }
                                checked={selectedDelProjects.includes(
                                    project.id
                                )}
                            />

                            <ProjectListData
                                projectId={project.id}
                                name={project.name}
                                description={project.description ?? ''}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectList;
