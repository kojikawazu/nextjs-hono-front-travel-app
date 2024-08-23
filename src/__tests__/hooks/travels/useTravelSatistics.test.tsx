/* eslint-disable no-undef */
import React from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { useTravelSatistics } from '@/app/hooks/travels/useTravelSatistics';
import CONSTANTS from '@/app/utils/common-constants';
import type { TravelStatisticsType } from '@/type/data.types';

const mockInitialData: TravelStatisticsType[] = [
    { year: 2023, period_key: 5, travel_count: 2, total_amount: 150000 },
    { year: 2023, period_key: 12, travel_count: 3, total_amount: 200000 },
    { year: 2022, period_key: 1005, travel_count: 1, total_amount: 50000 },
];

const mockYearlyData: TravelStatisticsType[] = [
    { year: 2022, period_key: 1005, travel_count: 1, total_amount: 50000 },
];

const mockWeeklyData: TravelStatisticsType[] = [
    { year: 2023, period_key: 13, travel_count: 2, total_amount: 150000 },
    { year: 2023, period_key: 14, travel_count: 3, total_amount: 200000 },
];

global.fetch = jest.fn((url) => {
    if (url.includes('year')) {
        return Promise.resolve({
            json: () => Promise.resolve(mockYearlyData),
        });
    } else if (url.includes('week')) {
        return Promise.resolve({
            json: () => Promise.resolve(mockWeeklyData),
        });
    }
    return Promise.resolve({
        json: () => Promise.resolve(mockInitialData),
    });
}) as jest.Mock;

describe('useTravelSatistics', () => {
    beforeEach(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    function setup() {
        const result: any = {};
        const TestComponent = () => {
            Object.assign(
                result,
                useTravelSatistics({
                    userId: 'user1',
                    statisticsDataList: mockInitialData,
                })
            );
            return null;
        };
        render(<TestComponent />);
        return result;
    }

    test('should initialize with correct default values', () => {
        const result = setup();

        expect(result.viewMode).toBe('month');
        expect(result.loading).toBe(false);
        expect(result.filteredData).toEqual([
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
        ]);
    });

    test('should change view mode and fetch data correctly', async () => {
        const result = setup();

        await act(async () => {
            await result.handleViewModeChange('year');
        });

        expect(result.viewMode).toBe('year');
        expect(result.loading).toBe(false);
        expect(result.filteredData).toEqual(mockYearlyData);
        expect(global.fetch).toHaveBeenCalledWith(
            `${CONSTANTS.SC_TRAVEL_DATAS_URL}/user1/grouped/year`
        );
    });

    test('should change view mode by projectId and fetch data correctly', async () => {
        const result = setup();

        await act(async () => {
            await result.handleViewModeChangeByProjectId('week', 'project1');
        });

        expect(result.viewMode).toBe('week');
        expect(result.loading).toBe(false);
        expect(result.filteredData).toEqual(mockWeeklyData);
        expect(global.fetch).toHaveBeenCalledWith(
            `${CONSTANTS.SC_TRAVEL_DATAS_URL}/user1/project1/grouped/week`
        );
    });

    test('should handle errors during data fetch', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.reject(new Error('Fetch error'))
        );

        const result = setup();

        await act(async () => {
            await result.handleViewModeChange('year');
        });

        // fetchがエラーを投げたことを確認
        expect(global.fetch).toHaveBeenCalled();

        // コンソールエラーが正しく呼ばれているかを確認
        expect(console.error).toHaveBeenCalledWith(
            'データ取得に失敗しました:',
            expect.any(Error)
        );
    });
});
