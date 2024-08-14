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

    const form = useForm<z.infer<typeof projectCreateSchema>>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            name: '',
            description: '',
        },
    });

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

    return {
        projectList,
        form,
        onCreateSubmit,
    };
};
