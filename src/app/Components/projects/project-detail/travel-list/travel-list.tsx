import { useEffect, useState } from "react";
import { Travel } from "@prisma/client";
import TravelCard from "@/app/Components/projects/project-detail/travel-list/molecules/travel-card";

interface TravelListProps {
    travelDefaultList: Travel[];
};

/**
 * 旅行リスト
 * @param travelDefaultList
 * @returns JSX
 */
const TravelList = ({
    travelDefaultList,
}: TravelListProps) => {
    const [travelList, setTravelList] = useState<Travel[]>(travelDefaultList);

    useEffect(() => {
        setTravelList(travelDefaultList);
    }, [travelDefaultList]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {travelList.map((travel) => (
                <TravelCard key={travel.id} travel={travel} />
            ))}
        </div>
    );
}

export default TravelList;