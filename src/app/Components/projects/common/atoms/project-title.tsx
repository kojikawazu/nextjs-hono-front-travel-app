interface ProjectTitleProps {
    title: string;
};

/**
 * プロジェクトタイトル
 * @param title
 * @returns JSX
 */
const ProjectTitle = ({
    title,
}: ProjectTitleProps) => {
    return (
        <div className="flex justify-center items-center">
            <h1 className="text-3xl font-bold text-center p-4">
                {title}
            </h1>
        </div>
    );
}

export default ProjectTitle;