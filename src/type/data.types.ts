export type TravelStatisticsType = {
    year: number;
    period_key: number;
    travel_count: number;
    total_amount: number;
};

export type TravelCalendarType = {
    date: Date;
    name: string;
};

export type ProjectCalendarType = {
    id: string;
    name: string;
    startDate?: Date | null;
    endDate?: Date | null;
};
