import { render, screen, cleanup  } from '@testing-library/react';
import { describe, test, expect, afterEach } from "bun:test";
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

    afterEach(() => {
        cleanup();
    });

    test("should render travel name", () => {
        render(<TravelCard travel={travel} />);
        expect(screen.queryByText(travel.name)).not.toBeNull();
    });

    test("should render travel description", () => {
        render(<TravelCard travel={travel} />);
        expect(screen.queryByText(travel.description as string)).not.toBeNull();
    });

    test("should render travel amount", () => {
        render(<TravelCard travel={travel} />);
        expect(screen.queryByText(`金額: ${travel.amount}円`)).not.toBeNull();
    });

    test("should render 'No description' when description is null", () => {
        const travelWithNullDescription: Travel = { ...travel, description: null };
        render(<TravelCard travel={travelWithNullDescription} />);
        expect(screen.queryByText("No description")).not.toBeNull();
    });

    test("should render '0円' when amount is null", () => {
        const travelWithNullAmount: Travel = { ...travel, amount: null };
        render(<TravelCard travel={travelWithNullAmount} />);
        expect(screen.queryByText("金額: 0円")).not.toBeNull();
    });
});