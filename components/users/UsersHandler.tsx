import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';

import { GetUsersFromSupabase } from '../../lib/supabase/users/DataResolver';
import UsersGrid from './UsersGrid';

export default function UsersHandler() {
  const { data, isLoading, refetch } = useQuery('users', () => GetUsersFromSupabase());
  return isLoading ? (
    <Box minHeight="250px" display="flex" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  ) : (
    <UsersGrid data={data} refetch={refetch} />
  );
}
