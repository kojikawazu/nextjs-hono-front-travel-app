import ProjectServerDetail from '@/app/Components/projects/project-detail/project-server-detail';

/**
 * プロジェクト詳細ページ
 * @param projectId
 * @returns JSX
 */
const ProjectDetailPage = ({
    params,
}: {
    params: {
        projectId: string;
    };
}) => {
    return <ProjectServerDetail projectId={params.projectId} />;
};

export default ProjectDetailPage;
