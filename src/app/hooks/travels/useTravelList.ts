import { useState, useEffect } from 'react';
import { Travel } from '@prisma/client';
import CONSTANTS from '@/app/utils/common-constants';

interface useTravelListProps {
    userId: string | undefined;
    projectId: string | undefined;
}

/**
 * 旅行リストのカスタムhooks
 * @param userId
 * @param projectId
 * @returns 旅行リストのカスタムhooks
 */
export const useTravelList = ({ userId, projectId }: useTravelListProps) => {
    const [travelList, setTravelList] = useState<Travel[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTravels = async () => {
            setIsLoading(true);

            try {
                console.log(`[useTravelList] fetch start.`);
                const res = await fetch(
                    `${CONSTANTS.TRAVEL_DATAS_URL}/${userId}/${projectId}`
                );
                console.log(`[useTravelList] fetch end. res.ok? : ${res.ok}`);

                if (res.ok) {
                    const travels = await res.json();
                    setTravelList(travels);
                }

                setIsLoading(false);
            } catch (err) {
                setIsLoading(false);
                console.error(err);
            }
        };

        fetchTravels();
    }, [userId, projectId]);

    return {
        travelList,
        isLoading,
    };
};
