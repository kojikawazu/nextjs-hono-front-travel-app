import React, { useEffect, useState } from "react";
import { Travel } from "@prisma/client";
import TravelCard from "@/app/Components/projects/project-detail/travel-list/molecules/travel-card";

interface TravelListProps {
    travelDefaultList: Travel[];
    handleUpdateModalOpen: (travel: Travel) => void;
    handleDeleteModalOpen: (travel: Travel) => void;
};

/**
 * 旅行リスト
 * @param travelDefaultList
 * @param handleUpdateModalOpen
 * @param handleDeleteModalOpen
 * @returns JSX
 */
const TravelList = ({
    travelDefaultList,
    handleUpdateModalOpen,
    handleDeleteModalOpen,
}: TravelListProps) => {
    const [travelList, setTravelList] = useState<Travel[]>(travelDefaultList);

    useEffect(() => {
        setTravelList(travelDefaultList);
    }, [travelDefaultList]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelList.map((travel) => (
                <TravelCard 
                    key={travel.id} 
                    travel={travel}
                    handleUpdateModalOpen={handleUpdateModalOpen}
                    handleDeleteModalOpen={handleDeleteModalOpen}
                />
            ))}
        </div>
    );
}

export default TravelList;