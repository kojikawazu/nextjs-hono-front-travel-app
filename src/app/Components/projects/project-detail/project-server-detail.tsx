import { Suspense } from 'react';
import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import CONSTANTS from '@/app/utils/common-constants';
import { Travel } from '@prisma/client';
import ProjectDetail from '@/app/Components/projects/project-detail/project-detail';
import ProjectDetailLoading from './project-detail-contents/atoms/project-detail-loading';

interface ProjectServerDetailProps {
    projectId: string;
}

/**
 * プロジェクト詳細(サーバー版)
 * @returns JSX
 */
const ProjectServerDetail = async ({ projectId }: ProjectServerDetailProps) => {
    const supabase = supabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const res = await fetch(
        `${CONSTANTS.SC_TRAVEL_DATAS_URL}/${user?.id}/${projectId}`
    );
    const travelSCList: Travel[] = await res.json();

    return (
        <Suspense fallback={<ProjectDetailLoading label={'Loading...'} />}>
            <ProjectDetail
                projectId={projectId}
                userId={user?.id}
                travelSCList={travelSCList}
            />
        </Suspense>
    );
};

export default ProjectServerDetail;
