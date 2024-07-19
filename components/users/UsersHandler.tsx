import React from 'react';
import { useQuery } from 'react-query';
import { Auth } from '@supabase/ui';

import { GetUsersFromSupabase } from '../../lib/supabase/users/DataResolver';
import UsersGrid from './UsersGrid';
import Spinner from '../common/Spinner';

export default function UsersHandler() {
  const { session } = Auth.useUser();
  const { data, isLoading, refetch, error, isFetching } = useQuery(
    'users',
    () => GetUsersFromSupabase(session.access_token),
    {
      retry: false,
    },
  );

  return isLoading ? (
    <div className="flex min-h-[250px] items-center justify-center">
      <Spinner color="teal" size="lg" />
    </div>
  ) : error ? (
    <div className="flex min-h-[250px] items-center justify-center">{error.toString()}</div>
  ) : (
    <UsersGrid data={data} refetch={refetch} isFetching={isFetching} />
  );
}
