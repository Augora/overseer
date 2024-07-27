'use server';

import { createClient } from '@/lib/supabase/Server';

export async function GetSession() {
  const supabase = await createClient();

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    throw new Error('Error while getting session data: ' + sessionError?.message);
  }

  if (session === null) {
    return null;
  }

  const { data, error: isAdminError } = await supabase.rpc('is_admin', {
    _user_id: session?.user?.id,
  });
  if (isAdminError) {
    throw new Error('Error while getting user isAdmin status: ' + isAdminError?.message);
  }

  return Object.assign(session, { isAdmin: data });
}
