/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderLink from '@/app/Components/header/atoms/header-link';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('<HeaderLink />', () => {
    test('should display the correct navigation links', () => {
        render(<HeaderLink />);

        // ナビゲーションリンクが表示されていることを確認
        expect(screen.getByText('プロジェクト')).toBeInTheDocument();
        expect(screen.getByText('統計')).toBeInTheDocument();
        expect(screen.getByText('カレンダー')).toBeInTheDocument();

        // リンクに正しい href 属性が設定されていることを確認
        expect(screen.getByText('プロジェクト')).toHaveAttribute(
            'href',
            '/projects'
        );
        expect(screen.getByText('統計')).toHaveAttribute(
            'href',
            '/projects/statistics'
        );
        expect(screen.getByText('カレンダー')).toHaveAttribute(
            'href',
            '/projects/calendar'
        );
    });

    test('should have correct CSS classes applied to the links', () => {
        render(<HeaderLink />);

        // 各リンクにCSSクラスが適用されていることを確認
        const projectLink = screen.getByText('プロジェクト');
        const statisticsLink = screen.getByText('統計');
        const calendarLink = screen.getByText('カレンダー');

        [projectLink, statisticsLink, calendarLink].forEach((link) => {
            expect(link).toHaveClass(
                'transition-colors duration-200 font-medium hover:text-blue-600'
            );
        });
    });
});
