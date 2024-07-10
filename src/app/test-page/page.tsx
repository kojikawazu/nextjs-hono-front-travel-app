'use client';

import React from 'react';
import useSWR from 'swr';

const TestPage = () => {
    const { data: text } = useSWR(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/test-route`, 
        (url) => fetch(url).then((res) => res.text())
    );

    return (
        <div>{text ? text : 'none'}</div>
    );
}

export default TestPage;