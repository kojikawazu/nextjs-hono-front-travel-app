/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeaderTitle from '@/app/Components/header/atoms/header-title';

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

describe('<HeaderTitle />', () => {
    test('should display the link and icon correctly', () => {
        render(<HeaderTitle />);

        // アイコンが表示されていることを確認
        expect(screen.getByTestId('icon')).toBeInTheDocument();

        // テキストが正しく表示されることを確認
        expect(screen.getByText('遠征管理サイト')).toBeInTheDocument();

        // リンク先が正しいことを確認
        const linkElement = screen.getByRole('link', {
            name: /遠征管理サイト/i,
        });
        expect(linkElement).toHaveAttribute('href', '/projects');
    });

    test('should have correct CSS classes applied', () => {
        render(<HeaderTitle />);

        // リンクに正しいCSSクラスがあることを確認
        const linkElement = screen.getByRole('link', {
            name: /遠征管理サイト/i,
        });
        expect(linkElement).toHaveClass(
            'flex items-center space-x-2 transition-colors duration-200 hover:text-blue-400'
        );

        // アイコンのCSSクラスが正しいことを確認
        const iconElement = screen.getByTestId('icon');
        expect(iconElement).toHaveClass('text-3xl');

        // テキストが正しいCSSクラスを持っていることを確認
        const textElement = screen.getByText('遠征管理サイト');
        expect(textElement).toHaveClass('text-xl font-bold');
    });
});
