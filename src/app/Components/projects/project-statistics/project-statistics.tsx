'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import CONSTANTS from '@/app/utils/common-constants';
import type { TravelStatisticsType } from '@/type/data.types';

import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import SideBar from '@/app/Components/layout/sidebar/side-bar';
import TravelSumStatistics from '@/app/Components/projects/project-statistics/statistics/travel-sum-statistics';
import TravelAmountStatistics from '@/app/Components/projects/project-statistics/statistics/travel-amount-statistics';

interface ProjectStatisticsProps {
    userId: string | undefined;
    statisticsDataSCList: TravelStatisticsType[]; 
};

type ViewMode = 'week' | 'month' | 'year';

/**
 * プロジェクト統計
 * @param userId ユーザーID
 * @param statisticsDataSCList 統計データリスト
 * @returns JSX
 */
const ProjectStatistics = ({
    userId,
    statisticsDataSCList: initialStatisticsDataSCList,
}: ProjectStatisticsProps) => {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<ViewMode>('month');
    const [statisticsDataSCList, setStatisticsDataSCList] = useState<TravelStatisticsType[]>(initialStatisticsDataSCList);
    const [loading, setLoading] = useState<boolean>(false);

    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const handleViewModeChange = async (mode: ViewMode) => {
        setViewMode(mode);

        if (mode !== 'month') {
            setLoading(true);
            try {
                const response = await fetch(`${CONSTANTS.SC_TRAVEL_DATAS_URL}/${userId}/grouped/${mode}`);
                const data: TravelStatisticsType[] = await response.json();
                setStatisticsDataSCList(data);
            } catch (error) {
                console.error('データ取得に失敗しました:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setStatisticsDataSCList(initialStatisticsDataSCList);
        }
    };

    const filteredData = statisticsDataSCList.filter((data) => {
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

    return (
        <div className="flex w-full min-h-screen bg-green-200">
            <div className="w-1/5 h-screen">
                <SideBar projectSCList={[]} />
            </div>

            <div className="w-4/5 h-screen flex flex-col">
                <div className="p-2 border border-pink-200">
                    <ProjectTitle title={'プロジェクト統計'} />
                </div>

                <div className="p-2">
                    <button onClick={() => handleViewModeChange('week')} className={`mr-2 ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                        週単位
                    </button>
                    <button onClick={() => handleViewModeChange('month')} className={`mr-2 ${viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                        月単位
                    </button>
                    <button onClick={() => handleViewModeChange('year')} className={`${viewMode === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                        年単位
                    </button>
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 p-2">
                            <TravelSumStatistics statisticsDataSCList={filteredData} />
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                            <TravelAmountStatistics statisticsDataSCList={filteredData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectStatistics;