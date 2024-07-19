'use client';

import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';

import supabase from '../lib/supabase/Client';
import GroupesHandler from '../components/groupes-parlementaires/GroupesHandler';

export default function Page() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session === null ? (
    <span className="flex justify-center items-center h-screen text-red-500 text-4xl">
      {'You must log in first.'}
    </span>
  ) : (
    <GroupesHandler />
  );
}
