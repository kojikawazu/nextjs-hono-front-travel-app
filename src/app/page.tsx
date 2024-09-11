'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        if (window.location.pathname === '/') {
            router.push('/projects');
        }
    }, [router]);

    return <main className="">Hello</main>;
}
