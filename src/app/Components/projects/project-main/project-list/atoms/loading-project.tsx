import React from 'react';

/**
 * ローディング
 * @returns JSX
 */
const LoadingProject = () => {
    return (
        <div className="flex-grow flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
    );
};

export default LoadingProject;
