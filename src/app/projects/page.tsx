import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import ProjectServerMain from '@/app/Components/projects/project-main/project-server-main';

/**
 * プロジェクトページ
 * @returns JSX
 */
const ProjectPage = () => {
    return (
      <div className="flex flex-col h-full bg-green-200">
        <div className="p-2 border border-pink-200">
          <ProjectTitle title={"プロジェクト"} />
        </div>

        <div className="flex-grow overflow-hidden">
          <ProjectServerMain />
        </div>
      </div>
    )
}

export default ProjectPage;