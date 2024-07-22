import 'server-only';

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

  return session;
}
