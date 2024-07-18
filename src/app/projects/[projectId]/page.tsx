import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import ProjectServerDetail from '@/app/Components/projects/project-detail/project-server-detail';

/**
 * プロジェクト詳細ページ
 * @param projectId
 * @returns JSX
 */
const ProjectDetailPage = ({ 
    params 
}: { 
    params: { 
        projectId: string 
    } 
}) => {
    console.log(params.projectId);

    return (
        <div className="flex flex-col h-full bg-green-200">
        <div className="p-2 border border-pink-200">
          <ProjectTitle />
        </div>

        <div className="flex-grow overflow-hidden">
          <ProjectServerDetail />
        </div>
      </div>
    );
}

export default ProjectDetailPage;