'use client';

import { Button } from '@nextui-org/react';
import { Session } from '@supabase/supabase-js';

import { login, logout } from '@/lib/supabase/login/actions';

interface SignInButtonProps {
  session: Session | null;
}

export default function SignInButton(props: SignInButtonProps) {
  const { session } = props;

  return (
    <Button color="primary" variant="flat" onClick={() => (session ? logout() : login())}>
      {session ? 'Sign out' : 'Sign in'}
    </Button>
  );
}
