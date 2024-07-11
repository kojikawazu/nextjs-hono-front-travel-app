import { supabaseServer } from '@/app/lib/supabase/supabase-server';
import AuthClientButton from './auth-client-button';

/**
 * サーバーコンポーネント用認証ボタン
 * @returns JSX
 */
const AuthServerButton = async () => {
  const supabase = supabaseServer();
  const { data: {user} } = await supabase.auth.getUser();

  return (
    <AuthClientButton session={user ? { user } : null} />
  )
}

export default AuthServerButton