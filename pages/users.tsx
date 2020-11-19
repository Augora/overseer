import Head from 'next/head';
import React from 'react';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';
import { Box } from '@chakra-ui/react';
import UsersHandler from '../components/users/UsersHandler';

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Users | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {props.session === null ? (
          'You must log in first.'
        ) : (
          <UsersHandler token={props.session.user.faunaDBToken} />
        )}
      </Box>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return { props: { session, cookies: ctx.req.headers.cookie ?? '' } };
}
