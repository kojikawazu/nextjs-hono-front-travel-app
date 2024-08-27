import React from 'react';
import ProjectServerStatisticsByProjectId from '@/app/Components/projects/project-statistics-by-projectid/project-server-statistics-by-projectid';

/**
 * プロジェクト統計ページ(プロジェクトID指定)
 * @returns JSX
 */
const ProjectStatisticsByProjectIdPage = ({
    params,
}: {
    params: {
        projectId: string;
    };
}) => {
    return <ProjectServerStatisticsByProjectId projectId={params.projectId} />;
};

export default ProjectStatisticsByProjectIdPage;
