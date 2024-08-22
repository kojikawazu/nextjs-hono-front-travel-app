import { supabaseServer } from '@/app/lib/supabase/supabase-server';

import CONSTANTS from '@/app/utils/common-constants';
import type { TravelStatisticsType } from '@/type/data.types';
import { Project } from '@prisma/client';

/**
 * 認証ユーザーの取得
 * @returns supabase auth user
 */
export async function getAuthUser() {
    const supabase = supabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();
    return user;
}

/**
 * プロジェクトリストの取得
 * @param userId ユーザーID
 * @returns プロジェクトリスト
 */
export async function getProjectList(userId: string) {
    const resGetProjectList = await fetch(
        `${CONSTANTS.SC_GET_PROJECT_DATAS_BY_USER_ID_URL}/${userId}`
    );
    const projectSCList: Project[] = await resGetProjectList.json();
    return projectSCList;
}

/**
 * 旅行統計データリストの取得(ユーザーID指定)
 * @param viewMode ビューモード
 * @param userId ユーザーID
 * @returns 旅行統計データリスト
 */
export async function getTravelGroupsByUserId(
    viewMode: string,
    userId: string
) {
    const resGetTravelGroups = await fetch(
        `${CONSTANTS.SC_TRAVEL_DATAS_URL}/${userId}/grouped/${viewMode}`
    );
    const statisticsDataSCList: TravelStatisticsType[] =
        await resGetTravelGroups.json();
    return statisticsDataSCList;
}

/**
 * 旅行統計データリストの取得(ユーザーIDとプロジェクトID指定)
 * @param viewMode ビューモード
 * @param userId ユーザーID
 * @param projectId プロジェクトID
 * @returns 旅行統計データリスト
 */
export async function getTravelGroupsByUserIdAndProjectId(
    viewMode: string,
    userId: string,
    projectId: string
) {
    const resGetTravelGroups = await fetch(
        `${CONSTANTS.SC_TRAVEL_DATAS_URL}/${userId}/${projectId}/grouped/${viewMode}`
    );
    const statisticsDataSCList: TravelStatisticsType[] =
        await resGetTravelGroups.json();
    return statisticsDataSCList;
}
