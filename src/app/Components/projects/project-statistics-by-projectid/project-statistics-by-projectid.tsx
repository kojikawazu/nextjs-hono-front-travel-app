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
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <aside className="w-64 bg-white shadow-md overflow-y-auto">
                <SideBar
                    projectSCList={[]}
                    projectStatisticsSCList={projectSCList}
                />
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm p-4">
                    <div className="flex justify-between items-center">
                        <ProjectTitle title="プロジェクト統計" />
                    </div>
                </header>

                <section className="flex-1 overflow-y-auto p-4">
                    <div className="flex flex-col h-[45%] p-6 space-y-6 overflow-y-auto">
                        <div className="bg-white rounded-lg shadow p-4">
                            <UnitChangeBtn
                                viewMode={viewMode}
                                handleViewModeChange={handleViewModeChange}
                                handleViewModeChangeByProjectId={
                                    handleViewModeChangeByProjectId
                                }
                                projectId={projectId}
                            />
                        </div>

                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="flex-grow bg-white rounded-lg shadow overflow-hidden">
                                <div className="flex flex-wrap -m-2">
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
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default ProjectStatisticsByProjectId;
