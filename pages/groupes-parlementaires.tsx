import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import GroupesHandler from '../components/groupes-parlementaires/GroupesHandler';
import isNull from 'lodash/isNull';
import { Auth } from '@supabase/ui';

export default function GroupesParlementaires() {
  const { session } = Auth.useUser();

  return (
    <>
      <Head>
        <title>Groupes Parlementaires | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {isNull(session) ? 'You must log in first.' : <GroupesHandler />}
      </Box>
    </>
  );
}
