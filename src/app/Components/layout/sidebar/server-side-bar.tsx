import React from 'react';
import { Project } from '@prisma/client';

import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import CONSTANTS from '@/app/utils/common-constants';

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
        <>
            <SideBar projectSCList={projectSCList} />
        </>
    );
};

export default ServerSideBar;
