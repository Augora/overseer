import Head from 'next/head';
import React from 'react';
import { Box } from '@chakra-ui/react';
import { Auth } from '@supabase/ui';

import UsersHandler from '../components/users/UsersHandler';

export default function Home(props) {
  const { session } = Auth.useUser();

  return (
    <div>
      <Head>
        <title>Users | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {session === null ? 'You must log in first.' : <UsersHandler />}
      </Box>
    </div>
  );
}
