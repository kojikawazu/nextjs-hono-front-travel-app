import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import AuthClientButton from './auth-client-button';

interface AuthServerButtonProps {
    className?: string;
}

/**
 * サーバーコンポーネント用認証ボタン
 * @param className
 * @returns JSX
 */
const AuthServerButton = async ({ className }: AuthServerButtonProps) => {
    const supabase = supabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <AuthClientButton
            session={user ? { user } : null}
            className={className}
        />
    );
};

export default AuthServerButton;
