import { useState } from 'react';

import CONSTANTS from '@/app/utils/common-constants';
import type { TravelStatisticsType } from '@/type/data.types';

export type ViewMode = 'week' | 'month' | 'year';

interface useTravelSatisticsProps {
    userId: string | undefined;
    statisticsDataList: TravelStatisticsType[];
}

/**
 * 旅行統計のカスタムhooks
 * @param userId
 * @param statisticsDataList
 * @returns 旅行統計のカスタムhooks
 */
export const useTravelSatistics = ({
    userId,
    statisticsDataList: initialStatisticsDataList,
}: useTravelSatisticsProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [loading, setLoading] = useState<boolean>(false);
    const [statisticsDataList, setStatisticsDataList] = useState<
        TravelStatisticsType[]
    >(initialStatisticsDataList);

    const handleViewModeChange = async (mode: ViewMode) => {
        setViewMode(mode);

        if (mode !== 'month') {
            setLoading(true);

            try {
                const response = await fetch(
                    `${CONSTANTS.SC_TRAVEL_DATAS_URL}/${userId}/grouped/${mode}`
                );

                const data: TravelStatisticsType[] = await response.json();
                setStatisticsDataList(data);
            } catch (error) {
                console.error('データ取得に失敗しました:', error);
                setStatisticsDataList(initialStatisticsDataList);
            } finally {
                setLoading(false);
            }
        } else {
            setStatisticsDataList(initialStatisticsDataList);
        }
    };

    const handleViewModeChangeByProjectId = async (
        mode: ViewMode,
        projectId: string
    ) => {
        setViewMode(mode);

        if (mode !== 'month') {
            setLoading(true);

            try {
                const response = await fetch(
                    `${CONSTANTS.SC_TRAVEL_DATAS_URL}/${userId}/${projectId}/grouped/${mode}`
                );

                const data: TravelStatisticsType[] = await response.json();
                setStatisticsDataList(data);
            } catch (error) {
                console.error('データ取得に失敗しました:', error);
                setStatisticsDataList(initialStatisticsDataList);
            } finally {
                setLoading(false);
            }
        } else {
            setStatisticsDataList(initialStatisticsDataList);
        }
    };

    const filteredData = statisticsDataList.filter((data) => {
        if (viewMode === 'year') {
            // 年単位のデータでは period_key が EXTRACT(YEAR FROM date) から来る
            return data.period_key >= 1000 && data.period_key <= 9999;
        } else if (viewMode === 'month') {
            // 月単位のデータでは period_key が 1〜12
            return data.period_key >= 1 && data.period_key <= 12;
        } else if (viewMode === 'week') {
            // 週単位のデータでは period_key が 13以上 (13週目以降)
            return data.period_key > 12;
        }
        return false;
    });

    return {
        viewMode,
        loading,
        handleViewModeChange,
        handleViewModeChangeByProjectId,
        filteredData,
    };
};
