import ProjectDetailLoading from '@/app/Components/projects/project-detail/project-detail-contents/atoms/project-detail-loading';

interface ProjectDetailContentProps {
    isLoading: boolean;
    name: string;
    description: string;
};

/**
 * プロジェクト詳細コンテンツ
 * @param isLoading
 * @param name
 * @param description
 * @returns JSX
 */
const ProjectDetailContent = ({
    isLoading,
    name,
    description,
}: ProjectDetailContentProps) => {
    return (
        <div className="h-full">
            {isLoading ? (
                <ProjectDetailLoading label={"Loading..."} />
            ) : (
                <div className="p-6">
                    <div className="text-2xl font-bold text-gray-800">{name}</div>
                    <div className="text-sm text-gray-400">{description}</div>
                </div>
            )}
        </div>
    );
}

export default ProjectDetailContent;