import { supabaseServer } from '@/app/lib/supabase/supabase-server';

import CONSTANTS from '@/app/utils/common-constants';
import type {
    TravelStatisticsType,
    ProjectCalendarType,
} from '@/type/data.types';
import { Project, Travel } from '@prisma/client';

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
 * プロジェクトの取得
 * @param projectId
 * @returns プロジェクト
 */
export async function getTravelListProjectId(projectId: string) {
    const resGetProject = await fetch(
        `${CONSTANTS.SC_PROJECT_DATAS_URL}/${projectId}`
    );
    const SCProject: Project = await resGetProject.json();
    return SCProject;
}

/**
 * プロジェクトリストの取得(ユーザーID指定,プロジェクトID指定)
 * @param userId ユーザーID
 * @param projectId プロジェクトID
 * @returns プロジェクトリスト
 */
export async function getTravelListByUserIdAndProjectId(
    userId: string,
    projectId: string
) {
    const resGetTravelList = await fetch(
        `${CONSTANTS.SC_TRAVEL_DATAS_URL}/${userId}/${projectId}`
    );
    const travelSCList: Travel[] = await resGetTravelList.json();
    return travelSCList;
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

/**
 * ユーザーIDによるプロジェクトカレンダーリストの取得
 * @param userId ユーザーID
 * @param year 年
 * @param month 月
 * @returns プロジェクトカレンダーリスト
 */
export async function getProjectCalendarByUserId(
    userId: string,
    year: number,
    month: number
) {
    const encodedYearAndMonth = encodeURIComponent(`${year}年${month}月`);
    const resGetProjectCalendarList = await fetch(
        `${CONSTANTS.SC_PROJECT_CALENDAR_DATAS_BY_USER_ID_URL}/${userId}?month=${encodedYearAndMonth}`
    );
    const projectCalendarSCList: ProjectCalendarType[] =
        await resGetProjectCalendarList.json();
    return projectCalendarSCList;
}
