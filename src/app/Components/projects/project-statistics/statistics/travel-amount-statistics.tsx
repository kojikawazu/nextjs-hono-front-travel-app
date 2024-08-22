import React from 'react';
import { Bar } from 'react-chartjs-2';
import type { TravelStatisticsType } from '@/type/data.types';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface PTravelSumStatisticsProps {
    statisticsDataSCList: TravelStatisticsType[];
}

/**
 * 旅行合計金額統計
 * @param statisticsDataSCList 統計データリスト
 * @returns JSX
 */
const TravelAmountStatistics = ({
    statisticsDataSCList,
}: PTravelSumStatisticsProps) => {
    // データを日付単位で並び替えます
    const sortedStatisticsData = [...statisticsDataSCList].sort((a, b) => {
        return a.year - b.year || a.period_key - b.period_key;
    });

    // ラベルのフォーマット
    const travelData = {
        labels: sortedStatisticsData.map((data) => {
            if (data.period_key > 999) {
                // 年単位の表示
                return `${data.period_key}年`;
            } else if (data.period_key <= 12) {
                // 月単位の表示
                return `${data.year}年 ${data.period_key}月`;
            } else {
                // 週単位の表示
                return `${data.year}年 第${data.period_key}週`;
            }
        }),
        datasets: [
            {
                label: '合計金額',
                data: sortedStatisticsData.map((data) => data.total_amount),
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
                text: '旅行統計データ(旅行合計金額)',
            },
        },
    };

    return <Bar data={travelData} options={options} />;
};

export default TravelAmountStatistics;
