'use client';

import React from 'react';
import { Project } from "@prisma/client";
import ProjectListData from '@/app/Components/projects/project-main/project-list/atoms/project-list-data';
import NotProjectData from '@/app/Components/projects/project-main/project-list/atoms/not-project-data';
import LoadingProject from '@/app/Components/projects/project-main/project-list/atoms/loading-project';
import ProjectListTitle from './atoms/project-list-title';

interface ProjectListProps {
    projectList: Project[];
    isLoading: boolean;
};

/**
 * プロジェクトリスト
 * @param projectList
 * @param isLoading
 * @returns JSX
 */
const ProjectList = ({
    projectList,
    isLoading,
}: ProjectListProps) => {

  return (
    <div className="flex flex-col h-full">
      <ProjectListTitle />
      { isLoading ? (
          <LoadingProject />
        ) : projectList.length === 0 ? (
          <NotProjectData />
        ) : (
          <div className="space-y-4 p-4 overflow-y-auto scrollbar-visible">
            {projectList.map((project) => (
              <ProjectListData
                key={project.id}
                projectId={project.id}
                name={project.name}
                description={project.description ?? ""}
              />
            ))}
          </div>
        )
      }
    </div>
  );
}

export default ProjectList;