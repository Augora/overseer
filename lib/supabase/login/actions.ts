import { createClient } from '@/lib/supabase/Client';

export async function login() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  if (error) {
    window.location.replace(`${location.origin}/error`);
  }
}

export async function logout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    window.location.replace(`${location.origin}/error`);
  }

  window.location.replace(`${location.origin}/`);
}
