import { Suspense } from 'react';
import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import CONSTANTS from '@/app/utils/common-constants';
import { Project, Travel } from '@prisma/client';

import ProjectDetail from '@/app/Components/projects/project-detail/project-detail';
import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';

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

    const resGetTravelList = await fetch(
        `${CONSTANTS.SC_TRAVEL_DATAS_URL}/${user?.id}/${projectId}`
    );
    const travelSCList: Travel[] = await resGetTravelList.json();

    const resGetProject = await fetch(
        `${CONSTANTS.SC_PROJECT_DATAS_URL}/${projectId}`
    );
    const SCProject: Project = await resGetProject.json();

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectDetail
                projectId={projectId}
                userId={user?.id}
                travelSCList={travelSCList}
                SCProject={SCProject}
            />
        </Suspense>
    );
};

export default ProjectServerDetail;
