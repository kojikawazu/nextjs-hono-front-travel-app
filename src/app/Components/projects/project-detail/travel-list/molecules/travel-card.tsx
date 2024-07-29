import { Travel } from "@prisma/client";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";

interface TravelCardProps {
    travel: Travel;
};

/**
 * 旅行カード
 * @param travel
 * @returns JSX
 */
const TravelCard = ({
    travel,
}: TravelCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{travel.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription>{travel.description || "No description"}</CardDescription>
                <p className="mt-2 font-semibold">金額: {travel.amount !== null ? `${travel.amount}円` : "0円"}</p>
            </CardContent>
        </Card>
    );
}

export default TravelCard;