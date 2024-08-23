'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import CONSTANTS from '@/app/utils/common-constants';
import type { TravelStatisticsType } from '@/type/data.types';
import { Project } from '@prisma/client';
import { useTravelSatistics } from '@/app/hooks/travels/useTravelSatistics';

import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import SideBar from '@/app/Components/layout/sidebar/side-bar';
import UnitChangeBtn from '@/app/Components/projects/project-statistics/common/unit-change-btn';
import TravelSumStatistics from '@/app/Components/projects/project-statistics/statistics/travel-sum-statistics';
import TravelAmountStatistics from '@/app/Components/projects/project-statistics/statistics/travel-amount-statistics';

interface ProjectStatisticsProps {
    userId: string | undefined;
    projectSCList: Project[];
    statisticsDataSCList: TravelStatisticsType[];
}

/**
 * プロジェクト統計
 * @param userId ユーザーID
 * @param projectSCList プロジェクトリスト
 * @param statisticsDataSCList 統計データリスト
 * @returns JSX
 */
const ProjectStatistics = ({
    userId,
    projectSCList,
    statisticsDataSCList,
}: ProjectStatisticsProps) => {
    const router = useRouter();
    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }
    const {
        viewMode,
        loading,
        handleViewModeChange,
        handleViewModeChangeByProjectId,
        filteredData,
    } = useTravelSatistics({
        userId: userId,
        statisticsDataList: statisticsDataSCList,
    });

    return (
        <div className="flex w-full min-h-screen bg-green-200">
            <div className="w-1/5 h-screen">
                <SideBar
                    projectSCList={[]}
                    projectStatisticsSCList={projectSCList}
                />
            </div>

            <div className="w-4/5 h-screen flex flex-col">
                <div className="p-2 border border-pink-200">
                    <ProjectTitle title={'プロジェクト統計'} />
                </div>

                <div className="p-2">
                    <UnitChangeBtn
                        viewMode={viewMode}
                        handleViewModeChange={handleViewModeChange}
                        handleViewModeChangeByProjectId={
                            handleViewModeChangeByProjectId
                        }
                    />
                </div>

                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 p-2">
                            <TravelSumStatistics
                                statisticsDataSCList={filteredData}
                            />
                        </div>
                        <div className="w-full md:w-1/2 p-2">
                            <TravelAmountStatistics
                                statisticsDataSCList={filteredData}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectStatistics;
