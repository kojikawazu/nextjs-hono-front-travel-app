/* eslint-disable no-undef */
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// AuthServerButton をモックする
jest.mock('@/app/Components/auth/auth-server-button', () => ({
    __esModule: true,
    default: () => {
        return <button>Login</button>;
    },
}));

import NoMobileMenu from '@/app/Components/header/molecules/no-mobile-menu';

describe('NoMobileMenu', () => {
    it('should render the HeaderLink component', async () => {
        render(<NoMobileMenu />);

        // HeaderLink がレンダリングされていることを確認
        expect(screen.getByText('プロジェクト')).toBeInTheDocument();
        expect(screen.getByText('統計')).toBeInTheDocument();
        expect(screen.getByText('カレンダー')).toBeInTheDocument();
    });

    it('should render the AuthServerButton component without a logged-in state', async () => {
        render(<NoMobileMenu />);

        await waitFor(() => {
            expect(screen.getByText('Login')).toBeInTheDocument();
        });
    });
});
