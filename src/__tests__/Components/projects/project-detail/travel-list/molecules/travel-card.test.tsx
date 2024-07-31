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

    const onDeleteMock = jest.fn().mockResolvedValue(undefined);

    afterEach(() => {
        cleanup();
        onDeleteMock.mockClear();
    });

    test("should render travel name", () => {
        render(<TravelCard travel={travel} onDelete={onDeleteMock} />);
        expect(screen.queryByText(travel.name)).toBeInTheDocument();
    });

    test("should render travel description", () => {
        render(<TravelCard travel={travel} onDelete={onDeleteMock} />);
        expect(screen.queryByText(travel.description as string)).toBeInTheDocument();
    });

    test("should render travel amount", () => {
        render(<TravelCard travel={travel} onDelete={onDeleteMock} />);
        expect(screen.queryByText(`金額: ${travel.amount}円`)).toBeInTheDocument();
    });

    test("should render 'No description' when description is null", () => {
        const travelWithNullDescription: Travel = { ...travel, description: null };
        render(<TravelCard travel={travelWithNullDescription} onDelete={onDeleteMock} />);
        expect(screen.queryByText("No description")).toBeInTheDocument();
    });

    test("should render '0円' when amount is null", () => {
        const travelWithNullAmount: Travel = { ...travel, amount: null };
        render(<TravelCard travel={travelWithNullAmount} onDelete={onDeleteMock} />);
        expect(screen.queryByText("金額: 0円")).toBeInTheDocument();
    });

    test("should open modal when delete button is clicked", () => {
        render(<TravelCard travel={travel} onDelete={onDeleteMock} />);
        
        const deleteButton = screen.getByLabelText(`delete-${travel.id}`);
        fireEvent.click(deleteButton);
        
        expect(screen.queryByText("この旅行を削除してもよろしいですか？")).toBeInTheDocument();
    });

    test("should call onDelete when confirm button in modal is clicked", async () => {
        render(<TravelCard travel={travel} onDelete={onDeleteMock} />);
        
        const deleteButton = screen.getByLabelText(`delete-${travel.id}`);
        fireEvent.click(deleteButton);

        const confirmButton = screen.getByText("削除");
        fireEvent.click(confirmButton);

        expect(onDeleteMock).toHaveBeenCalledWith(travel.id);
    });
});