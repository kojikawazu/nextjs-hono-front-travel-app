import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { travelCreateSchema } from "@/app/Components/schema/travel-create-schema";

interface useProjectFormProps {
    userId: string | undefined;
    projectId: string | undefined;
};

/**
 * 旅行のカスタムhooks
 * @param userId
 * @param projectId
 * @returns 
 */
export const useTravelForm = ({
    userId,
    projectId,
}: useProjectFormProps) => {

    const form = useForm<z.infer<typeof travelCreateSchema>>({
        resolver: zodResolver(travelCreateSchema),
        defaultValues: {
            name: "",
            description: "",
            amount: 0,
            date: "",
            category: "",
        },
    });

    const onCreateSubmit = useCallback(async (values: z.infer<typeof travelCreateSchema>) => {
        const {
            name,
            description,
            amount,
            date,
            category,
        } = values;

        console.log(name);

    }, [userId, projectId, form.reset]);

    return {
        form,
        onCreateSubmit,
    };
};