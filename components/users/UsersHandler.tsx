import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { Auth } from '@supabase/ui';

import { GetUsersFromSupabase } from '../../lib/supabase/users/DataResolver';
import UsersGrid from './UsersGrid';

export default function UsersHandler() {
  const { session } = Auth.useUser();
  const { data, isLoading, refetch, error, isFetching } = useQuery(
    'users',
    () => GetUsersFromSupabase(session.access_token),
    {
      retry: false,
    }
  );

  return isLoading ? (
    <Box minHeight="250px" display="flex" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  ) : error ? (
    <Box minHeight="250px" display="flex" alignItems="center" justifyContent="center">
      {error}
    </Box>
  ) : (
    <UsersGrid data={data} refetch={refetch} isFetching={isFetching} />
  );
}
