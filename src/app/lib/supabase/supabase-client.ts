import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/type/database.types';

/**
 * クライアントコンポーネント用supabase
 */
export const supabase = createClientComponentClient<Database>();
