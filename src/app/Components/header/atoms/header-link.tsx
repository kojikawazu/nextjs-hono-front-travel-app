import React from 'react';
import Link from 'next/link';

const navItems = [
    { name: 'プロジェクト', href: '/projects' },
    { name: '統計', href: '/projects/statistics' },
    { name: 'カレンダー', href: '/projects/calendar' },
];

interface HeaderLinkProps {
    isMobile?: boolean;
}

/**
 * ヘッダーリンクコンポーネント
 * @returns JSX
 */
const HeaderLink = ({ isMobile = false }: HeaderLinkProps) => {
    const baseClasses =
        'transition-colors duration-200 font-medium hover:text-blue-600';
    const mobileClasses = 'block w-full py-2 px-4 text-left';
    const desktopClasses = '';

    return (
        <nav className={isMobile ? 'md:hidden' : 'hidden md:flex space-x-6'}>
            {navItems.map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className={`${baseClasses} ${isMobile ? mobileClasses : desktopClasses}`}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default HeaderLink;
