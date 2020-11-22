import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';
import { useQuery } from 'react-query';
import { GetUsers } from '../../lib/faunadb/users/DataResolver';
import UsersGrid from './UsersGrid';

interface IUsersHandlerProps {
  token: string;
}

export default function UsersHandler(props: IUsersHandlerProps) {
  const { data, isLoading, refetch } = useQuery('users', () => GetUsers(props.token));
  return isLoading ? (
    <Box minHeight="250px" display="flex" alignItems="center" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  ) : (
    <UsersGrid token={props.token} data={data} refetch={refetch} />
  );
}
