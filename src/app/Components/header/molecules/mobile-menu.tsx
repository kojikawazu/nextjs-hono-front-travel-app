'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import HeaderLink from '@/app/Components/header/atoms/header-link';

interface MobileMenuProps {
    children?: React.ReactNode;
}

/**
 * モバイル用メニュー
 * @param children
 * @returns JSX
 */
const MobileMenu = ({ children }: MobileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="md:hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-blue-800 focus:outline-none"
            >
                <Menu size={24} />
            </button>
            {isOpen && (
                <div className="absolute left-0 right-0 mt-2 bg-blue-100 shadow-md">
                    <HeaderLink isMobile />
                    {children}
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
