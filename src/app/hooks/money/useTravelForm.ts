import { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Travel } from "@prisma/client";
import CONSTANTS from "@/app/utils/common-constants";
import { travelCreateSchema } from "@/app/schema/travel-create-schema";

interface useProjectFormProps {
    userId: string | undefined;
    projectId: string | undefined;
    travelDefaultList: Travel[];
};

/**
 * 旅行のカスタムhooks
 * @param userId
 * @param projectId
 * @param travelDefaultList
 * @returns 旅行のカスタムhooks
 */
export const useTravelForm = ({
    userId,
    projectId,
    travelDefaultList,
}: useProjectFormProps) => {
    const [travelList, setTravelList] = useState<Travel[]>(travelDefaultList);

    useEffect(() => {
        setTravelList(travelDefaultList);
    }, [travelDefaultList]);

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

        try {
            console.log(`[useTravelForm] fetch start.`);
            const res = await fetch(`${CONSTANTS.TRAVEL_DATAS_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    amount: amount,
                    date: date,
                    category: category,
                    userId: userId,
                    projectId: projectId,
                }),
            });
            console.log(`[useTravelForm] fetch end. res.ok? : ${res.ok}`);
            
            if (res.ok) {
                const travel: Travel = await res.json();
                setTravelList(prevTravelList => [...prevTravelList, travel]);
                form.reset();
            }
        } catch (err) {
            console.error(err);
        }

    }, [userId, projectId, form.reset]);

    return {
        form,
        onCreateSubmit,
        travelList,
    };
};