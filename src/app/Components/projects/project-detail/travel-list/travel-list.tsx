import { useEffect, useState } from "react";
import { Travel } from "@prisma/client";
import ProjectDetailLoading from "../project-detail-contents/atoms/project-detail-loading";

interface TravelListProps {
    travelDefaultList: Travel[];
    isLoading: boolean;
};

/**
 * 旅行リスト
 * @param travelDefaultList
 * @param isLoading
 * @returns JSX
 */
const TravelList = ({
    travelDefaultList,
    isLoading,
}: TravelListProps) => {
    const [travelList, setTravelList] = useState<Travel[]>(travelDefaultList);

    useEffect(() => {
        setTravelList(travelDefaultList);
    }, [travelDefaultList]);

    return (
        <>
            {isLoading ? (
                <ProjectDetailLoading label={"Loading..."} />
            ) : (
                <div>
                    {travelList.map((travel) => (
                        <div key={travel.id}>
                            <div>{travel.name}</div>
                            <div>{travel.description}</div>
                            <div>{travel.amount}</div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}

export default TravelList;