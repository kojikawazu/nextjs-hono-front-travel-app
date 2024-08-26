import React, { Suspense } from 'react';
import {
    getAuthUser,
    getProjectList,
} from '@/app/utils/supabase/supabase-server-functions';

import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import ProjectMain from '@/app/Components/projects/project-main/project-main';

/**
 * プロジェクトメイン (サーバー版)
 * @returns JSX
 */
const ProjectServerMain = async () => {
    const user = await getAuthUser();
    const projectSCList = await getProjectList(user?.id as string);

    return (
        <Suspense fallback={<ProjectLoading label={'Loading...'} />}>
            <ProjectMain userId={user?.id} projectSCList={projectSCList} />
        </Suspense>
    );
};

export default ProjectServerMain;
