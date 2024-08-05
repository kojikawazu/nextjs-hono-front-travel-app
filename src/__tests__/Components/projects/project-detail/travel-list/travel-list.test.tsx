import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Travel } from '@prisma/client';
import TravelList from '@/app/Components/projects/project-detail/travel-list/travel-list';

describe('TravelList', () => {
    const travelDefaultList: Travel[] = [
        {
            id: '1',
            name: 'Tokyo Trip',
            description: 'A wonderful trip to Tokyo',
            amount: 10000,
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user1',
            projectId: 'project1',
            categoryId: 'category1',
        },
        {
            id: '2',
            name: 'Kyoto Trip',
            description: 'A beautiful trip to Kyoto',
            amount: 8000,
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user2',
            projectId: 'project2',
            categoryId: 'category2',
        },
    ];

    const handleDeleteModalOpenMock = jest.fn().mockResolvedValue(undefined);
    const handleUpdateModalOpenMock = jest.fn().mockResolvedValue(undefined);

    afterEach(() => {
        cleanup();
        handleDeleteModalOpenMock.mockClear();
        handleUpdateModalOpenMock.mockClear();
    });

    test('should render travel list with travel cards', () => {
        render(
            <TravelList
                travelDefaultList={travelDefaultList}
                handleDeleteModalOpen={handleDeleteModalOpenMock}
                handleUpdateModalOpen={handleUpdateModalOpenMock}
            />
        );

        travelDefaultList.forEach((travel) => {
            expect(screen.queryByText(travel.name)).toBeInTheDocument();
            expect(
                screen.queryByText(travel.description as string)
            ).toBeInTheDocument();
            expect(
                screen.queryByText(`金額: ${travel.amount}円`)
            ).toBeInTheDocument();
        });
    });

    test('should update travel list when travelDefaultList prop changes', () => {
        const { rerender } = render(
            <TravelList
                travelDefaultList={travelDefaultList}
                handleDeleteModalOpen={handleDeleteModalOpenMock}
                handleUpdateModalOpen={handleUpdateModalOpenMock}
            />
        );

        const newTravelList: Travel[] = [
            {
                id: '3',
                name: 'Osaka Trip',
                description: 'An exciting trip to Osaka',
                amount: 9000,
                date: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 'user3',
                projectId: 'project3',
                categoryId: 'category3',
            },
        ];

        rerender(
            <TravelList
                travelDefaultList={newTravelList}
                handleDeleteModalOpen={handleDeleteModalOpenMock}
                handleUpdateModalOpen={handleUpdateModalOpenMock}
            />
        );

        newTravelList.forEach((travel) => {
            expect(screen.queryByText(travel.name)).toBeInTheDocument();
        });

        travelDefaultList.forEach((travel) => {
            expect(screen.queryByText(travel.name)).not.toBeInTheDocument();
        });
    });

    test('should call handleDeleteModalOpen when delete button is clicked', () => {
        render(
            <TravelList
                travelDefaultList={travelDefaultList}
                handleDeleteModalOpen={handleDeleteModalOpenMock}
                handleUpdateModalOpen={handleUpdateModalOpenMock}
            />
        );

        const deleteButton = screen.getByLabelText(
            `delete-${travelDefaultList[0].id}`
        );
        fireEvent.click(deleteButton);

        expect(handleDeleteModalOpenMock).toHaveBeenCalledWith(
            travelDefaultList[0]
        );
    });

    test('should call handleDeleteModalOpen when update button is clicked', () => {
        render(
            <TravelList
                travelDefaultList={travelDefaultList}
                handleDeleteModalOpen={handleDeleteModalOpenMock}
                handleUpdateModalOpen={handleUpdateModalOpenMock}
            />
        );

        const updateButton = screen.getByLabelText(
            `update-${travelDefaultList[0].id}`
        );
        fireEvent.click(updateButton);

        expect(handleUpdateModalOpenMock).toHaveBeenCalledWith(
            travelDefaultList[0]
        );
    });
});
