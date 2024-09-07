import React from 'react';
import Link from 'next/link';
import { IoIosAirplane } from 'react-icons/io';

/**
 * ヘッダータイトルコンポーネント
 * @returns JSX
 */
const HeaderTitle = () => {
    return (
        <Link
            href="/projects"
            className="flex items-center space-x-2  transition-colors duration-200 hover:text-blue-400"
        >
            <IoIosAirplane data-testid="icon" className="text-3xl" />
            <span className="text-xl font-bold">遠征管理サイト</span>
        </Link>
    );
};

export default HeaderTitle;
