/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import type { TravelStatisticsType } from '@/type/data.types';
import TravelAmountStatistics from '@/app/Components/projects/project-statistics/statistics/travel-amount-statistics';

jest.mock('react-chartjs-2', () => ({
    Bar: (props: any) => {
        return (
            <div data-testid="chartjs-bar">{JSON.stringify(props.data)}</div>
        );
    },
}));

describe('TravelAmountStatistics', () => {
    const mockStatisticsData: TravelStatisticsType[] = [
        {
            year: 2023,
            period_key: 5,
            travel_count: 2,
            total_amount: 150000,
        },
        {
            year: 2023,
            period_key: 12,
            travel_count: 3,
            total_amount: 200000,
        },
        {
            year: 2022,
            period_key: 1005,
            travel_count: 1,
            total_amount: 50000,
        },
    ];

    test('renders the chart with correct data', () => {
        const { getByTestId } = render(
            <TravelAmountStatistics statisticsDataSCList={mockStatisticsData} />
        );

        // Chart.js に渡されたデータが正しいか確認する
        const chartData = getByTestId('chartjs-bar');
        expect(chartData).toBeInTheDocument();

        // データが正しく渡されているかJSON形式で確認する
        const parsedData = JSON.parse(chartData.textContent || '{}');
        expect(parsedData.labels).toEqual([
            '1005年',
            '2023年 5月',
            '2023年 12月',
        ]);
        expect(parsedData.datasets[0].data).toEqual([50000, 150000, 200000]);
    });

    test('renders the chart title correctly', () => {
        const { getByTestId } = render(
            <TravelAmountStatistics statisticsDataSCList={mockStatisticsData} />
        );

        // Chart.js に渡されたオプションが正しいか確認する
        const chartOptions = JSON.parse(
            getByTestId('chartjs-bar').textContent || '{}'
        );
        expect(chartOptions).toBeTruthy();
        expect(chartOptions).toHaveProperty('datasets');
        expect(chartOptions.datasets[0]).toHaveProperty('label', '合計金額');
    });
});
