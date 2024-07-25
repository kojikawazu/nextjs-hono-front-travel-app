import ProjectDetailLoading from '@/app/Components/projects/project-detail/project-detail-contents/atoms/project-detail-loading';

interface ProjectDetailContentProps {
    isLoading: boolean;
    description: string;
};

/**
 * プロジェクト詳細コンテンツ
 * @param isLoading
 * @param description
 * @returns JSX
 */
const ProjectDetailContent = ({
    isLoading,
    description,
}: ProjectDetailContentProps) => {
    return (
        <div className="h-full">
            {isLoading ? (
                <ProjectDetailLoading label={"Loading..."} />
            ) : (
                <div className="p-6">
                    <div className="text-sm text-gray-400">{description}</div>
                </div>
            )}
        </div>
    );
}

export default ProjectDetailContent;