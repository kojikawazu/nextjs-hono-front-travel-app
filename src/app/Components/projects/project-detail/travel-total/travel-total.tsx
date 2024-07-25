interface TravelTotalProps {
    total: number;
};

/**
 * 旅行トータル
 * @param total
 * @returns JSX
 */
const TravelTotal = ({
    total,
}: TravelTotalProps) => {
    return (
        <div className="bg-white border-t border-gray-200 p-4 shadow-md">
            <div className="text-xl font-bold">合計金額: ¥{total.toLocaleString()}</div>
        </div>
    )
}

export default TravelTotal;