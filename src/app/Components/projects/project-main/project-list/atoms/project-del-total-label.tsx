import React from 'react';

interface ProjectDelTotalLabelProps {
    selectedDelSum: number;
    handleDelete: () => void;
}

/**
 * プロジェクト削除合計ラベル
 * @param selectedDelSum
 * @param handleDelete
 * @returns JSX
 */
const ProjectDelTotalLabel = ({
    selectedDelSum,
    handleDelete,
}: ProjectDelTotalLabelProps) => {
    return (
        <div className="flex justify-between items-center p-4">
            <span className="px-2">削除合計：{selectedDelSum}件</span>
            <button
                onClick={handleDelete}
                className="bg-black text-white px-4 py-2 rounded-lg"
            >
                削除
            </button>
        </div>
    );
};

export default ProjectDelTotalLabel;
