'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import CONSTANTS from '@/app/utils/common-constants';
import { Travel } from '@prisma/client';
import Modal from 'react-modal';

import { useProjectDetail } from '@/app/hooks/projects/useProjectDetail';
import { useTravelForm } from '@/app/hooks/travels/useTravelForm';
import { useTravelTotal } from '@/app/hooks/travels/useTravelTotal';

import ProjectModal from '@/app/Components/projects/common/atoms/project-modal';
import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import ProjectDetailContent from '@/app/Components/projects/project-detail/project-detail-contents/project-detail-contents';
import TravelCreateForm from '@/app/Components/projects/project-detail/travel-create-form/travel-create-form';
import TravelUpdateForm from '@/app/Components/projects/project-detail/travel-update-form/travel-update-form';
import TravelList from '@/app/Components/projects/project-detail/travel-list/travel-list';
import TravelTotal from '@/app/Components/projects/project-detail/travel-total/travel-total';

interface ProjectDetailProps {
    projectId: string;
    userId: string | undefined;
    travelSCList: Travel[];
}

/**
 * プロジェクト詳細
 * @param projectId
 * @param userId
 * @param travelSCList
 * @returns JSX
 */
const ProjectDetail = ({
    projectId,
    userId,
    travelSCList,
}: ProjectDetailProps) => {
    const router = useRouter();

    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const { project, isLoading } = useProjectDetail({
        projectId: projectId,
    });

    const {
        travelList,
        isUpdateModalOpen,
        currentUpdateTravel,
        isDeleteModalOpen,
        currentDeleteTravel,
        form,
        formUpdate,
        onCreateSubmit,
        onUpdateSubmit,
        onDelete,
        handleUpdateModalOpen,
        handleUpdateModalClose,
        handleDeleteModalOpen,
        handleDeleteModalClose,
        mapTravelToFormValues,
    } = useTravelForm({
        userId: userId,
        projectId: projectId,
        travelDefaultList: travelSCList,
    });

    const { totalAmount } = useTravelTotal({
        travelDefaultList: travelSCList,
    });

    return (
        <div className="flex flex-col h-[90%] overflow-hidden">
            <div className="p-2 border border-pink-200">
                <ProjectTitle title={project?.name ?? 'Non Title'} />
            </div>

            <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col p-4 space-y-4">
                    <div className="flex-grow bg-white rounded-lg shadow p-3">
                        <ProjectDetailContent
                            isLoading={isLoading}
                            description={
                                project?.description ?? 'Non Description'
                            }
                        />
                    </div>

                    <div className="flex-grow bg-white rounded-lg shadow p-3">
                        <TravelCreateForm
                            form={form}
                            onCreateSubmit={onCreateSubmit}
                        />
                    </div>

                    <div className="flex-grow bg-white rounded-lg shadow p-3">
                        <TravelList
                            travelDefaultList={travelList}
                            handleUpdateModalOpen={handleUpdateModalOpen}
                            handleDeleteModalOpen={handleDeleteModalOpen}
                        />
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0">
                <TravelTotal total={totalAmount} />
            </div>

            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={handleUpdateModalClose}
                contentLabel={'テスト'}
                className="bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto my-32"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                {currentUpdateTravel && (
                    <TravelUpdateForm
                        formUpdate={formUpdate}
                        onUpdateSubmit={onUpdateSubmit}
                        travel={mapTravelToFormValues(currentUpdateTravel)}
                    />
                )}
            </Modal>

            <ProjectModal
                modalIsOpen={isDeleteModalOpen}
                closeModal={handleDeleteModalClose}
                currentTravel={currentDeleteTravel}
                handleExecute={onDelete}
                contentLabel="削除確認"
                confirmText="この旅行を削除してもよろしいですか？"
                cancelText="キャンセル"
                okText="削除"
            />
        </div>
    );
};

export default ProjectDetail;
