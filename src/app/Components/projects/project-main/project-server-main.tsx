import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import ProjectMain from '@/app/Components/projects/project-main/project-main';

/**
 * プロジェクトメイン (サーバー版)
 * @returns JSX
 */
const ProjectServerMain = async () => {
    const supabase = supabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return <ProjectMain userId={user?.id} />;
};

export default ProjectServerMain;
