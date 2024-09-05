import React from 'react';
import Link from 'next/link';

/**
 * ヘッダーリンクコンポーネント
 * @returns JSX
 */
const HeaderLink = () => {
    return (
        <nav className="hidden md:flex space-x-6">
            {[
                { name: 'プロジェクト', href: '/projects' },
                { name: '統計', href: '/projects/statistics' },
                { name: 'カレンダー', href: '/projects/calendar' },
            ].map((item) => (
                <Link
                    key={item.name}
                    href={item.href}
                    className="transition-colors duration-200 font-medium hover:text-blue-600"
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

export default HeaderLink;
