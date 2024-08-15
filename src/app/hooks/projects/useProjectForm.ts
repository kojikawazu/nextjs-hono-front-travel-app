import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Project } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

import CONSTANTS from '@/app/utils/common-constants';
import { projectCreateSchema } from '@/app/schema/project-create-schema';

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
    const [selectedDelProjects, setSelectedDelProjects] = useState<string[]>(
        []
    );
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);

    const form = useForm<z.infer<typeof projectCreateSchema>>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
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
                    console.log(`fetch start.`);
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

                    console.log(`fetch end. res.ok? : ${res.ok}`);
                    if (res.ok) {
                        const project: Project = await res.json();
                        setProjectList((prevProjectList) => [
                            ...prevProjectList,
                            project,
                        ]);
                        form.reset();
                    }
                } catch (err) {
                    console.error(err);
                }
            } else {
                console.error('User ID is null.');
            }
        },
        [userId, form.reset]
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
            const res = await fetch(`${CONSTANTS.PROJECT_DATAS_URL}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ids: selectedDelProjects,
                }),
            });

            if (res.ok) {
                console.log('Projects deleted successfully');
                setProjectList((prevProjectList) =>
                    prevProjectList.filter(
                        (project) => !selectedDelProjects.includes(project.id)
                    )
                );
                setSelectedDelProjects([]);
            } else {
                console.error('Failed to delete projects');
            }
        } catch (err) {
            console.error('Error deleting projects:', err);
        }
    }, [selectedDelProjects]);

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
        selectedDelProjects,
        isDelModalOpen,
        setIsDelModalOpen,
        form,
        onCreateSubmit,
        onDeleteSubmit,
        handleCheckboxChange,
        handleDelete,
        confirmDelete,
    };
};
