import { GetSession } from '@/lib/supabase/GetSession';
import GroupesHandler from '../components/groupes-parlementaires/GroupesHandler';

export default async function Page() {
  const session = await GetSession();

  return session === null ? (
    <span className="flex justify-center items-center h-screen text-red-500 text-4xl">
      You must log in first.
    </span>
  ) : (
    <GroupesHandler />
  );
}
