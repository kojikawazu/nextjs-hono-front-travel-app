import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { Project } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import CONSTANTS from "@/app/utils/common-constants";
import { projectCreateSchema } from "@/app/schema/project-create-schema";

interface useProjectFormProps {
    userId: string | undefined,
};

/**
 * プロジェクトのカスタムhooks
 * @param userId
 * @returns カスタムhooks
 */
export const useProjectForm = ({
    userId,
}: useProjectFormProps) => {
    const [projectList, setProjectList] = useState<Project[]>([]);
    const [isLoading, setIsLoading]     = useState<boolean>(true);

    useEffect(() => {
        const fetchProjects = async () => {
            setIsLoading(true);
            
            try {
                console.log(`[useProjectForm] fetch start.`);
                const res = await fetch(`${CONSTANTS.GET_PROJECT_DATAS_BY_USER_ID_URL}/${userId}`);
                console.log(`[useProjectForm] fetch end. res.ok? : ${res.ok}`);

                if (res.ok) {
                    const projects = await res.json();
                    setProjectList(projects);
                }

                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.error(err);
            }
        }

        fetchProjects();
    }, [userId]);

    const form = useForm<z.infer<typeof projectCreateSchema>>({
        resolver: zodResolver(projectCreateSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const onCreateSubmit = useCallback(async (values: z.infer<typeof projectCreateSchema>) => {
        const {
            name,
            description,
        } = values;

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
                setProjectList(prevProjectList => [...prevProjectList, project]);
                form.reset();
            }
        } catch (err) {
            console.error(err);
        }

    }, [userId, form.reset]);

    return {
        projectList,
        isLoading,
        form,
        onCreateSubmit,
    };
}