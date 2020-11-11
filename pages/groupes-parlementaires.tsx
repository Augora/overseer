import Head from 'next/head';
import { Box } from '@chakra-ui/core';
import GroupesHandler from '../components/groupes-parlementaires/GroupesHandler';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';

export default function GroupesParlementaires(props) {
  return (
    <>
      <Head>
        <title>Groupes Parlementaires | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {props.session === null ? (
          'You must log in first.'
        ) : (
          <GroupesHandler faunaToken={props.session.user.faunaDBToken} />
        )}
      </Box>
    </>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return { props: { session, cookies: ctx.req.headers.cookie ?? '' } };
}
