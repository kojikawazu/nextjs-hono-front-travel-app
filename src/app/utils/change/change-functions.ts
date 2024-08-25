import type { ProjectCalendarType } from '@/type/data.types';

/**
 * プロジェクトカレンダーリストの変換
 * @param projectCalendarList プロジェクトカレンダーリスト
 * @returns 変換後のプロジェクトカレンダーリスト
 */
export function changeProjectCalendarList(
    projectCalendarList: ProjectCalendarType[]
) {
    const changedProjectCalendarList: ProjectCalendarType[] =
        projectCalendarList.map((project) => ({
            id: project.id,
            name: project.name,
            startDate: project.startDate
                ? new Date(project.startDate.toString())
                : null,
            endDate: project.endDate
                ? new Date(project.endDate.toString())
                : null,
        }));
    return changedProjectCalendarList;
}
