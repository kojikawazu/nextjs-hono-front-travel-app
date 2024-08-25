import CONSTANTS from '@/app/utils/common-constants';
import type { ProjectCalendarType } from '@/type/data.types';

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
