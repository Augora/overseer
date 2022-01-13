import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import GroupesHandler from '../components/groupes-parlementaires/GroupesHandler';
import supabase from '../lib/supabase/Client';
import { User } from '@supabase/supabase-js';
import isNull from 'lodash/isNull';

interface IGroupesParlementairesProps {
  user: User;
  token: string;
}

export default function GroupesParlementaires({ user }: IGroupesParlementairesProps) {
  return (
    <>
      <Head>
        <title>Groupes Parlementaires | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {isNull(user) ? 'You must log in first.' : <GroupesHandler />}
      </Box>
    </>
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
