import React from 'react';
import { Project } from '@prisma/client';

import NotProjectData from '@/app/Components/projects/project-main/project-list/atoms/not-project-data';
import ProjectListTitle from '@/app/Components/projects/project-main/project-list/atoms/project-list-title';
import ProjectDelTotalLabel from '@/app/Components/projects/project-main/project-list/atoms/project-del-total-label';
import ProjectDelInput from '@/app/Components/projects/project-main/project-list/atoms/project-del-input';
import ProjectListData from '@/app/Components/projects/project-main/project-list/atoms/project-list-data';
import ProjectEditModalBtn from '../../common/atoms/project-edit-modal-btn';

interface ProjectListProps {
    projectList: Project[];
    handleUpdateModalOpen: (project: Project) => void;
    selectedDelProjects: string[];
    handleDelete: () => void;
    handleCheckboxChange: (id: string) => void;
}

/**
 * プロジェクトリスト
 * @param projectList
 * @param handleUpdateModalOpen
 * @param selectedProjects
 * @param handleDelete
 * @param handleCheckboxChange
 * @returns JSX
 */
const ProjectList = ({
    projectList,
    handleUpdateModalOpen,
    selectedDelProjects,
    handleDelete,
    handleCheckboxChange,
}: ProjectListProps) => {
    return (
        <div className="flex flex-col h-full">
            <ProjectListTitle />

            <ProjectDelTotalLabel
                selectedDelSum={selectedDelProjects.length}
                handleDelete={handleDelete}
            />

            {projectList.length === 0 ? (
                <NotProjectData />
            ) : (
                <div className="space-y-4 p-4 overflow-y-auto scrollbar-visible">
                    {projectList.map((project) => (
                        <div key={project.id} className="flex">
                            <ProjectDelInput
                                projectId={project.id}
                                className="mr-4"
                                handleCheckboxChange={handleCheckboxChange}
                                selectedDelProjects={selectedDelProjects}
                            />

                            <ProjectEditModalBtn
                                id={project.id}
                                className="mr-4"
                                handleOpen={() =>
                                    handleUpdateModalOpen(project)
                                }
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
