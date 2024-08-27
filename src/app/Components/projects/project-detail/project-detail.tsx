'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';

import CONSTANTS from '@/app/utils/common-constants';
import { Project, Travel } from '@prisma/client';

import { useTravelForm } from '@/app/hooks/travels/useTravelForm';
import { useTravelTotal } from '@/app/hooks/travels/useTravelTotal';

import ProjectModal from '@/app/Components/projects/common/atoms/project-modal';
import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import ProjectDetailContent from '@/app/Components/projects/project-detail/project-detail-contents/project-detail-contents';
import TravelCreateForm from '@/app/Components/projects/project-detail/travel-create-form/travel-create-form';
import TravelUpdateForm from '@/app/Components/projects/project-detail/travel-update-form/travel-update-form';
import TravelList from '@/app/Components/projects/project-detail/travel-list/travel-list';
import TravelTotal from '@/app/Components/projects/project-detail/travel-total/travel-total';

Modal.setAppElement('body');

interface ProjectDetailProps {
    projectId: string;
    userId: string | undefined;
    travelSCList: Travel[];
    SCProject: Project;
}

/**
 * プロジェクト詳細
 * @param projectId
 * @param userId
 * @param travelSCList
 * @param SCProject
 * @returns JSX
 */
const ProjectDetail = ({
    projectId,
    userId,
    travelSCList,
    SCProject,
}: ProjectDetailProps) => {
    const router = useRouter();

    if (userId === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const {
        travelList,
        isUpdateModalOpen,
        currentUpdateTravel,
        isDeleteModalOpen,
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
        travelDefaultList: travelList,
    });

    return (
        <>
            <header className="bg-white shadow-sm p-4">
                <div className="flex justify-between items-center">
                    <ProjectTitle title={SCProject?.name ?? 'Non Title'} />
                </div>
            </header>

            <section
                className="flex-1 overflow-y-auto p-4"
                style={{ paddingBottom: '80px' }}
            >
                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <ProjectDetailContent
                        description={
                            SCProject?.description ?? 'Non Description'
                        }
                    />
                </div>

                <div className="bg-white rounded-lg shadow p-4 mb-4">
                    <TravelCreateForm
                        form={form}
                        onCreateSubmit={onCreateSubmit}
                    />
                </div>

                <div className="bg-white rounded-lg shadow p-4 mb-4 flex-grow overflow-y-auto">
                    <TravelList
                        travelDefaultList={travelList}
                        handleUpdateModalOpen={handleUpdateModalOpen}
                        handleDeleteModalOpen={handleDeleteModalOpen}
                    />
                </div>
            </section>

            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 z-10">
                <TravelTotal total={totalAmount} />
            </div>

            <Modal
                isOpen={isUpdateModalOpen}
                onRequestClose={handleUpdateModalClose}
                contentLabel={'更新フォーム'}
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
                handleExecute={onDelete}
                contentLabel="削除確認"
                confirmText="この旅行を削除してもよろしいですか？"
                cancelText="キャンセル"
                okText="削除"
            />
        </>
    );
};

export default ProjectDetail;
