/* eslint-disable no-undef */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import MobileMenu from '@/app/Components/header/molecules/mobile-menu';

describe('MobileMenu', () => {
    it('should render the menu button', () => {
        render(<MobileMenu />);
        const menuButton = screen.getByRole('button');
        expect(menuButton).toBeInTheDocument();
    });

    it('should open the menu when button is clicked', () => {
        render(<MobileMenu />);
        const menuButton = screen.getByRole('button');

        // 初期状態ではメニューが閉じていることを確認
        expect(screen.queryByText('プロジェクト')).not.toBeInTheDocument();

        // メニューボタンをクリック
        fireEvent.click(menuButton);

        // メニューが開かれたことを確認
        expect(screen.getByText('プロジェクト')).toBeInTheDocument();
        expect(screen.getByText('統計')).toBeInTheDocument();
        expect(screen.getByText('カレンダー')).toBeInTheDocument();
    });

    it('should close the menu when button is clicked again', () => {
        render(<MobileMenu />);
        const menuButton = screen.getByRole('button');

        // メニューボタンをクリックして開く
        fireEvent.click(menuButton);
        expect(screen.getByText('プロジェクト')).toBeInTheDocument();

        // メニューボタンをもう一度クリックして閉じる
        fireEvent.click(menuButton);
        expect(screen.queryByText('プロジェクト')).not.toBeInTheDocument();
    });

    it('should render children inside the menu when open', () => {
        render(
            <MobileMenu>
                <div>Additional Content</div>
            </MobileMenu>
        );
        const menuButton = screen.getByRole('button');

        // メニューが開かれていないときは children が表示されていない
        expect(
            screen.queryByText('Additional Content')
        ).not.toBeInTheDocument();

        // メニューを開く
        fireEvent.click(menuButton);

        // children が表示される
        expect(screen.getByText('Additional Content')).toBeInTheDocument();
    });
});
