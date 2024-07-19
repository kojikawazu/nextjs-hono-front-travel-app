import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import CONSTANTS from "@/app/utils/common-constants";
import { Project } from "@prisma/client";
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