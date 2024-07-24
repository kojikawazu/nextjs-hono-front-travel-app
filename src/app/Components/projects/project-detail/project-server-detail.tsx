import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import ProjectDetail from '@/app/Components/projects/project-detail/project-detail';

interface ProjectServerDetailProps {
    projectId: string,
};

/**
 * プロジェクト詳細(サーバー版)
 * @returns JSX
 */
const ProjectServerDetail = async ({
    projectId,
}: ProjectServerDetailProps) => {
    const supabase = supabaseServer();
    const { data: {user} } = await supabase.auth.getUser();

    return (
        <ProjectDetail
            projectId={projectId}
            userId={user?.id}
        />
    );
}

export default ProjectServerDetail;