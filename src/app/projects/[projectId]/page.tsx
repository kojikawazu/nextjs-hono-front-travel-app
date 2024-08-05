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
    return (
        <div className="flex flex-col h-full bg-green-200 hoge">
            <ProjectServerDetail projectId={params.projectId} />
        </div>
    );
};

export default ProjectDetailPage;
