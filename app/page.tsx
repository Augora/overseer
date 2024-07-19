'use client';

import GroupesHandler from '../components/groupes-parlementaires/GroupesHandler';
import useSupabaseSession from '../lib/react-custom-hooks/useSupabaseSession';

export default function Page() {
  const session = useSupabaseSession();

  return session === null ? (
    <span className="flex justify-center items-center h-screen text-red-500 text-4xl">
      {'You must log in first.'}
    </span>
  ) : (
    <GroupesHandler />
  );
}
