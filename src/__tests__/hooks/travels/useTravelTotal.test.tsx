/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useEffect } from 'react';

import { Travel } from '@prisma/client';
import { useTravelTotal } from '@/app/hooks/travels/useTravelTotal';

const TestComponent = ({ travelList }: { travelList: Travel[] }) => {
    const { totalAmount } = useTravelTotal({ travelDefaultList: travelList });

    useEffect(() => {
        console.log('Total Amount:', totalAmount);
    }, [totalAmount]);

    return <div>Total: {totalAmount}</div>;
};

describe('useTravelTotal', () => {
    const mockTravelList: Travel[] = [
        {
            id: '1',
            name: 'Tokyo Trip',
            description: null,
            amount: 1000,
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
            description: null,
            amount: 2000,
            date: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 'user1',
            projectId: 'project1',
            categoryId: 'category1',
        },
    ];

    test('should calculate the correct total amount', () => {
        render(<TestComponent travelList={mockTravelList} />);
        expect(screen.getByText('Total: 3000')).toBeInTheDocument();
    });

    test('should update the total amount when travel list changes', () => {
        const { rerender } = render(
            <TestComponent travelList={mockTravelList} />
        );
        expect(screen.getByText('Total: 3000')).toBeInTheDocument();

        const newTravelList: Travel[] = [
            ...mockTravelList,
            {
                id: '3',
                name: 'Osaka Trip',
                description: null,
                amount: 1500,
                date: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                userId: 'user1',
                projectId: 'project1',
                categoryId: 'category1',
            },
        ];

        rerender(<TestComponent travelList={newTravelList} />);
        expect(screen.getByText('Total: 4500')).toBeInTheDocument();
    });

    test('should handle an empty travel list', () => {
        render(<TestComponent travelList={[]} />);
        expect(screen.getByText('Total: 0')).toBeInTheDocument();
    });
});
