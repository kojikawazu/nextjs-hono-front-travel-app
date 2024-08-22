'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import CONSTANTS from '@/app/utils/common-constants';
import type { TravelStatisticsType } from '@/type/data.types';
import { Project } from '@prisma/client';
import { useTravelSatistics } from '@/app/hooks/travels/useTravelSatistics';

import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import SideBar from '@/app/Components/layout/sidebar/side-bar';
import TravelSumStatistics from '@/app/Components/projects/project-statistics/statistics/travel-sum-statistics';
import TravelAmountStatistics from '@/app/Components/projects/project-statistics/statistics/travel-amount-statistics';

interface ProjectStatisticsByProjectIdProps {
    userId: string | undefined;
    projectId: string;
    projectSCList: Project[];
    statisticsDataSCList: TravelStatisticsType[];
}

/**
 * プロジェクト統計(プロジェクトID指定)
 * @param userId
 * @param projectId
 * @param projectSCList
 * @param statisticsDataSCList
 * @returns JSX
 */
const ProjectStatisticsByProjectId = ({
    userId,
    projectId,
    projectSCList,
    statisticsDataSCList,
}: ProjectStatisticsByProjectIdProps) => {
    const router = useRouter();
    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const { viewMode, loading, handleViewModeChangeByProjectId, filteredData } =
        useTravelSatistics({
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
                    <button
                        onClick={() =>
                            handleViewModeChangeByProjectId('week', projectId)
                        }
                        className={`mr-2 ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        週単位
                    </button>
                    <button
                        onClick={() =>
                            handleViewModeChangeByProjectId('month', projectId)
                        }
                        className={`mr-2 ${viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        月単位
                    </button>
                    <button
                        onClick={() =>
                            handleViewModeChangeByProjectId('year', projectId)
                        }
                        className={`${viewMode === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        年単位
                    </button>
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

export default ProjectStatisticsByProjectId;
