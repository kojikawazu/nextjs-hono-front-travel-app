import { useEffect, useState } from "react";
import { Project } from "@prisma/client";
import CONSTANTS from "@/app/utils/common-constants";

interface useProjectDetailProps {
    projectId: string,
};

/**
 * プロジェクト詳細のカスタムhooks
 * @param projectId
 * @returns カスタムhooks
 */
export const useProjectDetail = ({
    projectId,
}: useProjectDetailProps) => {
    const [project, setProject] = useState<Project | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProject = async () => {
            setIsLoading(true);
            try {
                console.log(`[useProjectDetail] fetch start.`);
                const res = await fetch(`${CONSTANTS.GET_PROJECT_DATAS_BY_PROJECT_ID_URL}/${projectId}`);
                console.log(`[useProjectDetail] fetch end. res.ok? : ${res.ok}`);

                if (res.ok) {
                    const project = await res.json();
                    setProject(project);
                }
                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.error(err);
            }
        }

        fetchProject();
    }, [projectId]);

    return {
        project,
        isLoading,
    };
};