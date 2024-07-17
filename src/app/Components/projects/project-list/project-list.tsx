'use client';

import React from 'react';
import { Project } from "@prisma/client";
import ProjectListData from '@/app/Components/projects/project-list/atoms/project-list-data';

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
      <h3 className="text-2xl font-bold text-center p-4">プロジェクトリスト</h3>
      { isLoading ? (
        <div className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        ) : projectList.length === 0 ? (
          <div className="flex-grow flex justify-center items-center text-gray-500">プロジェクトがありません</div>
        ) : (
          <div className="space-y-4 p-4 overflow-y-auto scrollbar-visible">
            {projectList.map((project) => (
              <ProjectListData
                key={project.id}
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