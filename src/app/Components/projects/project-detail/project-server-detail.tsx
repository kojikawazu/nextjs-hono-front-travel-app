import { supabaseServer } from '@/app/lib/supabase/supabase-server';

/**
 * プロジェクト詳細(サーバー版)
 * @returns JSX
 */
const ProjectServerDetail = async () => {
    const supabase = supabaseServer();
    const { data: {user} } = await supabase.auth.getUser();

    return (
        <div>project-server-detail</div>
    );
}

export default ProjectServerDetail;