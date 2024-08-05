'use client';

import React from 'react';
import { supabase } from '@/app/lib/supabase/supabase-client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

/**
 * クライアント用認証ボタンProps
 */
interface AuthClientButtonProps {
    session: { user: User } | null;
}

/**
 * クライアント用認証ボタン
 * @param session
 * @returns JSX
 */
const AuthClientButton = ({ session }: AuthClientButtonProps) => {
    const router = useRouter();

    if (!session) {
        router.push('/auth/signin');
    }

    const handleSignIn = async () => {
        router.push('/auth/signin');
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <>
            {session ? (
                <Button onClick={handleSignOut}>サインアウト</Button>
            ) : (
                <Button onClick={handleSignIn}>サインイン</Button>
            )}
        </>
    );
};

export default AuthClientButton;
