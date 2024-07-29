import { render, screen, cleanup  } from '@testing-library/react';
import { describe, test, expect, afterEach } from "bun:test";
import { Travel } from "@prisma/client";
import TravelList from '@/app/Components/projects/project-detail/travel-list/travel-list';

describe('TravelList', () => {
    const travelDefaultList: Travel[] = [
        {
            id: "1",
            name: "Tokyo Trip",
            description: "A wonderful trip to Tokyo",
            amount: 10000,
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: "user1",
            projectId: "project1",
            categoryId: "category1",
        },
        {
            id: "2",
            name: "Kyoto Trip",
            description: "A beautiful trip to Kyoto",
            amount: 8000,
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: "user2",
            projectId: "project2",
            categoryId: "category2",
        },
    ];

    afterEach(() => {
        cleanup();
    });

    test("should render travel list with travel cards", () => {
        render(<TravelList travelDefaultList={travelDefaultList} />);
        
        travelDefaultList.forEach(travel => {
            expect(screen.queryByText(travel.name)).not.toBeNull();
        });

        travelDefaultList.forEach(travel => {
            expect(screen.queryByText(travel.description as string)).not.toBeNull();
        });

        travelDefaultList.forEach(travel => {
            expect(screen.queryByText(`金額: ${travel.amount}円`)).not.toBeNull();
        });
    });

    test("should update travel list when travelDefaultList prop changes", () => {
        const { rerender } = render(<TravelList travelDefaultList={travelDefaultList} />);

        const newTravelList: Travel[] = [
            {
                id: "3",
                name: "Osaka Trip",
                description: "An exciting trip to Osaka",
                amount: 9000,
                date: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: "user3",
                projectId: "project3",
                categoryId: "category3",
            },
        ];

        rerender(<TravelList travelDefaultList={newTravelList} />);
        
        newTravelList.forEach(travel => {
            expect(screen.queryByText(travel.name)).not.toBeNull();
        });

        travelDefaultList.forEach(travel => {
            expect(screen.queryByText(travel.name)).toBeNull();
        });
    });
});