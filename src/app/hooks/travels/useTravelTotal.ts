import { useEffect, useState } from 'react';
import { Travel } from '@prisma/client';

interface useTravelTotalProps {
    travelDefaultList: Travel[];
}

/**
 * 旅行合計金額のカスタムフック
 * @param travelDefaultList
 * @returns 旅行合計金額のカスタムフック
 */
export const useTravelTotal = ({ travelDefaultList }: useTravelTotalProps) => {
    const [totalAmount, setTotalAmount] = useState<number>(0);

    useEffect(() => {
        setTotalAmount(
            travelDefaultList.reduce((acc, travel) => acc + travel.amount!, 0)
        );
    }, [travelDefaultList]);

    return {
        totalAmount,
    };
};
