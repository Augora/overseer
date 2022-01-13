import Head from 'next/head';
import React from 'react';
import { Box } from '@chakra-ui/react';

import UsersHandler from '../components/users/UsersHandler';
import supabase from '../lib/supabase/Client';

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Users | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {props.session === null ? 'You must log in first.' : <UsersHandler />}
      </Box>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user, error, token, data } = await supabase.auth.api.getUserByCookie(req);

  if (error) {
    console.error(error);
    return { props: { errorMessage: error.message } };
  }

  return { props: { user, token, data } };
}
