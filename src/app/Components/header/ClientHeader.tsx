import React from 'react';
import HeaderTitle from '@/app/Components/header/atoms/header-title';
import HeaderLink from '@/app/Components/header/atoms/header-link';
import AuthServerButton from '@/app/Components/auth/auth-server-button';

/**
 * クライアントヘッダー
 * @returns JSX
 */
const ClientHeader = () => {
    return (
        <header className="w-full  bg-blue-100 text-blue-800 shadow-sm">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <HeaderTitle />
                    <HeaderLink />

                    <div className="flex items-center space-x-4">
                        <AuthServerButton
                            className={
                                'bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200'
                            }
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ClientHeader;
