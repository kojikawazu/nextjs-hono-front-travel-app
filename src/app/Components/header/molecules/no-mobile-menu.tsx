import React from 'react';
import HeaderLink from '@/app/Components/header/atoms/header-link';
import AuthServerButton from '@/app/Components/auth/auth-server-button';

/**
 * モバイルメニューなし
 * @returns JSX
 */
const NoMobileMenu = () => {
    return (
        <>
            <div className="hidden md:block">
                <HeaderLink />
            </div>

            <div className="hidden md:block">
                <AuthServerButton className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-200" />
            </div>
        </>
    );
};

export default NoMobileMenu;
