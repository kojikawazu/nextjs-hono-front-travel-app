import React from 'react';
import { Travel } from "@prisma/client";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { FiTrash2 } from "react-icons/fi";
import { useModal } from '@/app/hooks/common/useModal';
import ProjectModal from '@/app/Components/projects/common/atoms/project-modal';

interface TravelCardProps {
    travel: Travel;
    onDelete: (travelId: string) => Promise<void>;
};

/**
 * 旅行カード
 * @param travel
 * @param onDelete
 * @returns JSX
 */
const TravelCard = ({
    travel,
    onDelete,
}: TravelCardProps) => {

    const {
        modalIsOpen,
        openModal,
        closeModal,
    } = useModal();

    const handleDelete = async () => {
        await onDelete(travel.id);
        closeModal();
    }

    return (
        <>
            <Card className="w-full">
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>{travel.name}</CardTitle>
                    <button onClick={openModal} className="text-red-500 hover:text-red-700" aria-label={`delete-${travel.id}`}>
                        <FiTrash2 size={24} />
                    </button>
                </CardHeader>
                <CardContent>
                    <CardDescription>{travel.description || "No description"}</CardDescription>
                    <p className="mt-2 font-semibold">金額: {travel.amount !== null ? `${travel.amount}円` : "0円"}</p>
                </CardContent>
            </Card>
            
            <ProjectModal 
                modalIsOpen={modalIsOpen} 
                closeModal={closeModal} 
                handleExecute={handleDelete} 
                contentLabel="削除確認" 
                confirmText="この旅行を削除してもよろしいですか？" 
                cancelText="キャンセル" 
                okText="削除"
            />
        </>
    );
}

export default TravelCard;