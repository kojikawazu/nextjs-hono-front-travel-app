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
    className?: string;
}

/**
 * クライアント用認証ボタン
 * @param session
 * @param className
 * @returns JSX
 */
const AuthClientButton = ({ session, className }: AuthClientButtonProps) => {
    const router = useRouter();
    const signInHref = '/auth/signin';

    if (!session) {
        router.push(signInHref);
    }

    const handleSignIn = async () => {
        router.push(signInHref);
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <>
            {session ? (
                <Button onClick={handleSignOut} className={className}>
                    サインアウト
                </Button>
            ) : (
                <Button onClick={handleSignIn} className={className}>
                    サインイン
                </Button>
            )}
        </>
    );
};

export default AuthClientButton;
