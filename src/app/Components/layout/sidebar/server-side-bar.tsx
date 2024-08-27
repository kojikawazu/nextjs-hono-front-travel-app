import React, { Suspense } from 'react';
import { Project } from '@prisma/client';

import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import CONSTANTS from '@/app/utils/common-constants';

import ProjectLoading from '@/app/Components/projects/common/atoms/project-loading';
import SideBar from '@/app/Components/layout/sidebar/side-bar';

/**
 * サーバーサイド用サイドバー
 * @returns JSX
 */
const ServerSideBar = async () => {
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
            <aside className="w-64 bg-white shadow-md overflow-y-auto">
                <SideBar
                    projectSCList={projectSCList}
                    projectStatisticsSCList={[]}
                />
            </aside>
        </Suspense>
    );
};

export default ServerSideBar;
