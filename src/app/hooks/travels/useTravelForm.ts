import { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Travel } from '@prisma/client';
import CONSTANTS from '@/app/utils/common-constants';
import {
    travelCreateSchema,
    travelUpdateSchema,
} from '@/app/schema/travel-schema';

interface useProjectFormProps {
    userId: string | undefined;
    projectId: string | undefined;
    travelDefaultList: Travel[];
}

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

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [currentUpdateTravel, setCurrentUpdateTravel] =
        useState<Travel | null>(null);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentDeleteTravel, setCurrentDeleteTravel] =
        useState<Travel | null>(null);

    useEffect(() => {
        setTravelList(travelDefaultList);
    }, [travelDefaultList]);

    /**
     * 旅行フォーム
     */
    const form = useForm<z.infer<typeof travelCreateSchema>>({
        resolver: zodResolver(travelCreateSchema),
        defaultValues: {
            name: '',
            description: '',
            amount: 0,
            date: '',
            category: '',
        },
    });

    /**
     * 旅行更新フォーム
     */
    const formUpdate = useForm<z.infer<typeof travelUpdateSchema>>({
        resolver: zodResolver(travelUpdateSchema),
        defaultValues: {
            travelId: '',
            name: '',
            description: '',
            amount: 0,
            date: '',
            category: '',
        },
    });

    /**
     * 旅行作成
     */
    const onCreateSubmit = useCallback(
        async (values: z.infer<typeof travelCreateSchema>) => {
            const { name, description, amount, date, category } = values;

            try {
                console.log(`[useTravelForm] create fetch start.`);
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
                console.log(
                    `[useTravelForm] create fetch end. res.ok? : ${res.ok}`
                );

                if (res.ok) {
                    const travel: Travel = await res.json();
                    setTravelList((prevTravelList) => [
                        ...prevTravelList,
                        travel,
                    ]);
                    form.reset();
                }
            } catch (err) {
                console.error(err);
            }
        },
        [userId, projectId, form.reset]
    );

    /**
     * 旅行更新
     */
    const onUpdateSubmit = useCallback(
        async (values: z.infer<typeof travelUpdateSchema>) => {
            const { travelId, name, description, amount, date, category } =
                values;

            try {
                console.log(`[useTravelForm] update fetch start.`);
                const res = await fetch(
                    `${CONSTANTS.TRAVEL_DATAS_URL}/${travelId}`,
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name: name,
                            description: description,
                            amount: amount,
                            date: date,
                            category: category,
                        }),
                    }
                );
                console.log(
                    `[useTravelForm] update fetch end. res.ok? : ${res.ok}`
                );

                if (res.ok) {
                    const updatedTravel: Travel = await res.json();

                    setTravelList((prevTravelList) =>
                        prevTravelList.map((travel) =>
                            travel.id === updatedTravel.id
                                ? updatedTravel
                                : travel
                        )
                    );

                    formUpdate.reset();
                    handleUpdateModalClose();
                }
            } catch (err) {
                console.error(err);
            }
        },
        [userId, projectId, formUpdate.reset]
    );

    /**
     * 旅行削除
     * @param travelId
     */
    const onDelete = async () => {
        const travelId = currentDeleteTravel?.id;
        if (!travelId) return;

        try {
            console.log(`[useTravelForm] delete fetch start.`);
            const res = await fetch(
                `${CONSTANTS.TRAVEL_DATAS_URL}/${travelId}`,
                {
                    method: 'DELETE',
                }
            );
            console.log(
                `[useTravelForm] delete fetch end. res.ok? : ${res.ok}`
            );

            if (res.ok) {
                const travel: Travel = await res.json();
                setTravelList((prevTravelList) =>
                    prevTravelList.filter((item) => item.id !== travel.id)
                );
                handleDeleteModalClose();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateModalOpen = (travel: Travel) => {
        setCurrentUpdateTravel(travel);
        setIsUpdateModalOpen(true);
    };

    const handleUpdateModalClose = () => {
        setCurrentUpdateTravel(null);
        setIsUpdateModalOpen(false);
    };

    const handleDeleteModalOpen = (travel: Travel) => {
        setCurrentDeleteTravel(travel);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteModalClose = () => {
        setCurrentDeleteTravel(null);
        setIsDeleteModalOpen(false);
    };

    const mapTravelToFormValues = (travel: Travel) => {
        let formattedDate = '';
        if (travel.date) {
            const date = new Date(travel.date);
            if (!isNaN(date.getTime())) {
                formattedDate = date.toISOString().split('T')[0];
            }
        }
        return {
            name: travel.name,
            description: travel.description || '',
            amount: travel.amount || 0,
            date: formattedDate,
            category: travel.categoryId,
            travelId: travel.id,
        };
    };

    return {
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
    };
};
