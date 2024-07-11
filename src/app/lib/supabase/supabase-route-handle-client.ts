import { Database } from "@/type/database.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers"

/**
 * Supabase(API用)
 * @returns createRouteHandlerClient
 */
export const supabaseRouteHandleClient = () => {
    cookies().getAll();
    return createRouteHandlerClient<Database>({ cookies });
}