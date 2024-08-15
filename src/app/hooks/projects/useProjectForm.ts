import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import CONSTANTS from '@/app/utils/common-constants';
import { Project } from '@prisma/client';
import {
    projectCreateSchema,
    projectUpdateSchema,
} from '@/app/schema/project-schema';

interface useProjectFormProps {
    userId: string | undefined;
    projectSCList: Project[];
}

/**
 * プロジェクトのカスタムhooks
 * @param userId
 * @param projectSCList
 * @returns カスタムhooks
 */
export const useProjectForm = ({
    userId,
    projectSCList,
}: useProjectFormProps) => {
    const [projectList, setProjectList] = useState<Project[]>(projectSCList);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentUpdateProject, setCurrentUpdateProject] =
        useState<Project | null>(null);

    const [selectedDelProjects, setSelectedDelProjects] = useState<string[]>(
        []
    );
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);

    /**
     * プロジェクトフォーム
     */
    const form = useForm<z.infer<typeof projectCreateSchema>>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

    /**
     * プロジェクト更新フォーム
     */
    const formUpdate = useForm<z.infer<typeof projectUpdateSchema>>({
        resolver: zodResolver(projectUpdateSchema),
        defaultValues: {
            projectId: '',
            name: '',
            description: '',
        },
    });

    /**
     * プロジェクト作成処理
     */
    const onCreateSubmit = useCallback(
        async (values: z.infer<typeof projectCreateSchema>) => {
            const { name, description } = values;

            if (userId) {
                try {
                    console.debug(
                        `[useProjectForm][onCreateSubmit] fetch start.`
                    );

                    const res = await fetch(`${CONSTANTS.PROJECT_DATAS_URL}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            description: description,
                            userId: userId,
                        }),
                    });

                    console.debug(
                        `[useProjectForm][onCreateSubmit] fetch end. res.ok? : ${res.ok}`
                    );

                    if (res.ok) {
                        const project: Project = await res.json();
                        setProjectList((prevProjectList) => [
                            ...prevProjectList,
                            project,
                        ]);
                        form.reset();
                    }
                } catch (err) {
                    console.error('Error creating projects:', err);
                }
            } else {
                console.error('User ID is null.');
            }
        },
        [userId, form.reset]
    );

    const onUpdateSubmit = useCallback(
        async (values: z.infer<typeof projectUpdateSchema>) => {
            const { projectId, name, description } = values;

            try {
                console.debug(
                    '[useProjectForm][onUpdateSubmit()] update fetch start.'
                );

                const res = await fetch(
                    `${CONSTANTS.PROJECT_DATAS_URL}/${projectId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            description: description,
                        }),
                    }
                );

                console.debug(
                    `[useProjectForm][onUpdateSubmit()] update fetch end. res.ok? : ${res.ok}`
                );

                if (res.ok) {
                    const updatedProject: Project = await res.json();

                    setProjectList((prevProjectList) =>
                        prevProjectList.map((project) =>
                            project.id === updatedProject.id
                                ? updatedProject
                                : project
                        )
                    );

                    formUpdate.reset();
                    handleUpdateModalClose();
                }
            } catch (err) {
                console.error('Error updating projects:', err);
            }
        },
        [userId, formUpdate.reset]
    );

    /**
     * プロジェクト削除処理
     */
    const onDeleteSubmit = useCallback(async () => {
        if (selectedDelProjects.length === 0) {
            console.error('No selected projects.');
            return;
        }

        try {
            console.debug(
                '[useProjectForm][onDeleteSubmit()] delete fetch start.'
            );

            const res = await fetch(`${CONSTANTS.PROJECT_DATAS_URL}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ids: selectedDelProjects,
                }),
            });

            console.debug(
                `[useProjectForm][onDeleteSubmit()] delete fetch end. res.ok? : ${res.ok}`
            );

            if (res.ok) {
                setProjectList((prevProjectList) =>
                    prevProjectList.filter(
                        (project) => !selectedDelProjects.includes(project.id)
                    )
                );
                setSelectedDelProjects([]);
            }
        } catch (err) {
            console.error('Error deleting projects:', err);
        }
    }, [selectedDelProjects]);

    /**
     * 更新モーダルを開く
     * @param project
     */
    const handleUpdateModalOpen = (project: Project) => {
        setCurrentUpdateProject(project);
        formUpdate.reset({
            projectId: project.id,
            name: project.name,
            description: project.description ?? '',
        });
        setIsUpdateModalOpen(true);
    };

    /**
     * 更新モーダルを閉じる
     */
    const handleUpdateModalClose = () => {
        setCurrentUpdateProject(null);
        setIsUpdateModalOpen(false);
    };

    /**
     * チェックボックス選択処理
     */
    const handleCheckboxChange = useCallback(
        (id: string) => {
            setSelectedDelProjects((prev) => {
                if (prev.includes(id)) {
                    return prev.filter((p) => p !== id);
                }
                return [...prev, id];
            });
        },
        [setSelectedDelProjects]
    );

    /**
     * 削除ボタンクリック処理
     */
    const handleDelete = async () => {
        if (selectedDelProjects.length === 0) {
            return;
        }
        setIsDelModalOpen(true);
    };

    /**
     * 削除確認モーダルの削除ボタンクリック処理
     */
    const confirmDelete = async () => {
        onDeleteSubmit();
        setIsDelModalOpen(false);
    };

    return {
        projectList,
        isUpdateModalOpen,
        currentUpdateProject,
        selectedDelProjects,
        isDelModalOpen,
        setIsDelModalOpen,
        form,
        formUpdate,
        onCreateSubmit,
        onUpdateSubmit,
        onDeleteSubmit,
        handleUpdateModalOpen,
        handleUpdateModalClose,
        handleCheckboxChange,
        handleDelete,
        confirmDelete,
    };
};
