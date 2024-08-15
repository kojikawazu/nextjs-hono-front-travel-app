'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from 'react-modal';

import CONSTANTS from '@/app/utils/common-constants';
import { Project } from '@prisma/client';

import { useProjectForm } from '@/app/hooks/projects/useProjectForm';

import ProjectTitle from '@/app/Components/projects/common/atoms/project-title';
import SideBar from '@/app/Components/layout/sidebar/side-bar';
import ProjectCreateForm from '@/app/Components/projects/project-main/project-create/project-create-form';
import ProjectUpdateForm from '@/app/Components/projects/project-main/project-update/project-update-form';
import ProjectList from '@/app/Components/projects/project-main/project-list/project-list';
import ProjectModal from '@/app/Components/projects/common/atoms/project-modal';
import ProjectModalChild from '@/app/Components/projects/common/atoms/project-modal-child';

interface ProjectMainProps {
    userId: string | undefined;
    projectSCList: Project[];
}

Modal.setAppElement('body');

/**
 * プロジェクトメイン
 * @param userId ユーザーID
 * @param projectSCList プロジェクトリスト
 * @returns JSX
 */
const ProjectMain = ({ userId, projectSCList }: ProjectMainProps) => {
    const router = useRouter();

    if (userId === undefined || projectSCList === undefined) {
        router.push(CONSTANTS.AUTH_SIGNIN);
    }

    const {
        projectList,
        isUpdateModalOpen,
        selectedDelProjects,
        isDelModalOpen,
        setIsDelModalOpen,
        form,
        formUpdate,
        onCreateSubmit,
        onUpdateSubmit,
        handleDelete,
        handleUpdateModalOpen,
        handleUpdateModalClose,
        handleCheckboxChange,
        confirmDelete,
    } = useProjectForm({
        userId,
        projectSCList,
    });

    return (
        <div className="flex w-full min-h-screen bg-green-200">
            <div className="w-1/5 h-screen">
                <SideBar projectSCList={[]} />
            </div>

            <div className="w-4/5 h-screen flex flex-col">
                <div className="p-2 border border-pink-200">
                    <ProjectTitle title={'プロジェクト'} />
                </div>

                <div className="flex flex-col h-full p-6 space-y-6 overflow-y-auto">
                    <div className="bg-white rounded-lg shadow p-4">
                        <ProjectCreateForm
                            form={form}
                            onCreateSubmit={onCreateSubmit}
                        />
                    </div>

                    <div className="flex-grow bg-white rounded-lg shadow overflow-hidden">
                        <div className="h-full overflow-y-auto">
                            <ProjectList
                                projectList={projectList}
                                handleUpdateModalOpen={handleUpdateModalOpen}
                                selectedDelProjects={selectedDelProjects}
                                handleDelete={handleDelete}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ProjectModalChild
                contentLabel={'テスト'}
                isModalOpen={isUpdateModalOpen}
                closeModal={handleUpdateModalClose}
            >
                <ProjectUpdateForm
                    formUpdate={formUpdate}
                    onUpdateSubmit={onUpdateSubmit}
                />
            </ProjectModalChild>

            <ProjectModal
                modalIsOpen={isDelModalOpen}
                closeModal={() => setIsDelModalOpen(false)}
                handleExecute={confirmDelete}
                contentLabel="削除確認"
                confirmText="選択されたプロジェクトを削除してもよろしいですか？"
                cancelText="キャンセル"
                okText="削除"
            />
        </div>
    );
};

export default ProjectMain;
