'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

import CONSTANTS from '@/app/utils/common-constants';
import type { TravelStatisticsType } from '@/type/data.types';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface ProjectStatisticsProps {
    userId: string | undefined;
    statisticsDataSCList: TravelStatisticsType[]; 
};

/**
 * プロジェクト統計
 * @param userId ユーザーID
 * @param statisticsDataSCList 統計データリスト
 * @returns JSX
 */
const ProjectStatistics = ({
    userId,
    statisticsDataSCList,
}: ProjectStatisticsProps) => {
    const router = useRouter();

    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const data = {
        labels: statisticsDataSCList.map((data) => `${data.year} - ${data.period_key}`),
        datasets: [
            {
                label: 'Travel Count',
                data: statisticsDataSCList.map((data) => data.travel_count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Total Amount',
                data: statisticsDataSCList.map((data) => data.total_amount),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Project Statistics',
            },
        },
    };

    return (
        <div>
            <h2>Project Statistics</h2>
            <Bar data={data} options={options} />
        </div>
    );
}

export default ProjectStatistics;