import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { Travel } from "@prisma/client";
import TravelCard from '@/app/Components/projects/project-detail/travel-list/molecules/travel-card';

describe('TravelCard', () => {
    const travel: Travel = {
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
    };

    const handleDeleteModalOpenMock = jest.fn().mockResolvedValue(undefined);
    const handleUpdateModalOpenMock = jest.fn().mockResolvedValue(undefined);

    afterEach(() => {
        cleanup();
        handleDeleteModalOpenMock.mockClear();
        handleUpdateModalOpenMock.mockClear();
    });

    test("should render travel name", () => {
        render(<TravelCard travel={travel} handleDeleteModalOpen={handleDeleteModalOpenMock} handleUpdateModalOpen={handleUpdateModalOpenMock} />);
        expect(screen.queryByText(travel.name)).toBeInTheDocument();
    });

    test("should render travel description", () => {
        render(<TravelCard travel={travel} handleDeleteModalOpen={handleDeleteModalOpenMock} handleUpdateModalOpen={handleUpdateModalOpenMock} />);
        expect(screen.queryByText(travel.description as string)).toBeInTheDocument();
    });

    test("should render travel amount", () => {
        render(<TravelCard travel={travel} handleDeleteModalOpen={handleDeleteModalOpenMock} handleUpdateModalOpen={handleUpdateModalOpenMock} />);
        expect(screen.queryByText(`金額: ${travel.amount}円`)).toBeInTheDocument();
    });

    test("should render 'No description' when description is null", () => {
        const travelWithNullDescription: Travel = { ...travel, description: null };
        render(<TravelCard travel={travelWithNullDescription} handleDeleteModalOpen={handleDeleteModalOpenMock} handleUpdateModalOpen={handleUpdateModalOpenMock} />);
        expect(screen.queryByText("No description")).toBeInTheDocument();
    });

    test("should render '0円' when amount is null", () => {
        const travelWithNullAmount: Travel = { ...travel, amount: null };
        render(<TravelCard travel={travelWithNullAmount} handleDeleteModalOpen={handleDeleteModalOpenMock} handleUpdateModalOpen={handleUpdateModalOpenMock} />);
        expect(screen.queryByText("金額: 0円")).toBeInTheDocument();
    });

    test("should call handleDeleteModalOpen when delete button is clicked", () => {
        render(<TravelCard travel={travel} handleDeleteModalOpen={handleDeleteModalOpenMock} handleUpdateModalOpen={handleUpdateModalOpenMock} />);
        
        const deleteButton = screen.getByLabelText(`delete-${travel.id}`);
        fireEvent.click(deleteButton);
        
        expect(handleDeleteModalOpenMock).toHaveBeenCalledWith(travel);
    });

    test("should call handleUpdateModalOpen when edit button is clicked", () => {
        render(<TravelCard travel={travel} handleDeleteModalOpen={handleDeleteModalOpenMock} handleUpdateModalOpen={handleUpdateModalOpenMock} />);
        
        const editButton = screen.getByLabelText(`update-${travel.id}`);
        fireEvent.click(editButton);
        
        expect(handleUpdateModalOpenMock).toHaveBeenCalledWith(travel);
    });
});