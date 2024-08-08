'use client';

import React from 'react';
import useSWR from 'swr';

const TestPage = () => {
    const backend_url =
        process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

    const { data: text } = useSWR(`${backend_url}/test-route`, (url) =>
        fetch(url).then((res) => res.text())
    );

    return <div data-testid="api-text">{text ? text : 'none'}</div>;
};

export default TestPage;
