import React, { Suspense } from 'react';
import { supabaseServer } from '@/app/lib/supabase/supabase-server';

import CONSTANTS from '@/app/utils/common-constants';
import { Project } from '@prisma/client';

import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
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

    const resGetProjectList = await fetch(
        `${CONSTANTS.SC_GET_PROJECT_DATAS_BY_USER_ID_URL}/${user?.id}`
    );
    const projectSCList: Project[] = await resGetProjectList.json();

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectMain userId={user?.id} projectSCList={projectSCList} />
        </Suspense>
    );
};

export default ProjectServerMain;
