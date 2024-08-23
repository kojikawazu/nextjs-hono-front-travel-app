import React from 'react';
import { ViewMode } from '@/app/hooks/travels/useTravelSatistics';

interface UnitChangeBtnProps {
    viewMode: ViewMode;
    handleViewModeChange: (mode: ViewMode) => void;
    handleViewModeChangeByProjectId: (
        mode: ViewMode,
        projectId: string
    ) => void;
    projectId?: string;
}

/**
 * 単位変更ボタン
 * @param viewMode
 * @param handleViewModeChange
 * @param handleViewModeChangeByProjectId
 * @param projectId
 * @returns JSX
 */
const UnitChangeBtn = ({
    viewMode,
    handleViewModeChange,
    handleViewModeChangeByProjectId,
    projectId = '',
}: UnitChangeBtnProps) => {
    return (
        <>
            <button
                onClick={() =>
                    projectId == ''
                        ? handleViewModeChange('week')
                        : handleViewModeChangeByProjectId('week', projectId)
                }
                className={`mr-2 ${viewMode === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
                週単位
            </button>
            <button
                onClick={() =>
                    projectId == ''
                        ? handleViewModeChange('month')
                        : handleViewModeChangeByProjectId('month', projectId)
                }
                className={`mr-2 ${viewMode === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
                月単位
            </button>
            <button
                onClick={() =>
                    projectId == ''
                        ? handleViewModeChange('year')
                        : handleViewModeChangeByProjectId('year', projectId)
                }
                className={`${viewMode === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
                年単位
            </button>
        </>
    );
};

export default UnitChangeBtn;
