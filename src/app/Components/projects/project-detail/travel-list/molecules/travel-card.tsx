import React from 'react';
import { Travel } from "@prisma/client";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import ProjectEditModalBtn from '@/app/Components/projects/common/atoms/project-edit-modal-btn';
import ProjectDelModalBtn from '@/app/Components/projects/common/atoms/project-del-modal-btn';

interface TravelCardProps {
    travel: Travel;
    handleUpdateModalOpen: (travel: Travel) => void;
    handleDeleteModalOpen: (travel: Travel) => void;
};

/**
 * 旅行カード
 * @param travel
 * @param handleUpdateModalOpen
 * @param handleDeleteModalOpen
 * @returns JSX
 */
const TravelCard = ({
    travel,
    handleUpdateModalOpen,
    handleDeleteModalOpen,
}: TravelCardProps) => {
    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>{travel.name}</CardTitle>

                    <div className="flex space-x-2">
                        <ProjectEditModalBtn
                            id={travel.id}
                            handleOpen={() => handleUpdateModalOpen(travel)}
                        />
                        <ProjectDelModalBtn
                            id={travel.id}
                            handleOpen={() => handleDeleteModalOpen(travel)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <CardDescription>{travel.description || "No description"}</CardDescription>
                    <p className="mt-2 font-semibold">金額: {travel.amount !== null ? `${travel.amount}円` : "0円"}</p>
                </CardContent>
            </Card>
        </>
    );
}

export default TravelCard;