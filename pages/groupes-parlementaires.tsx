import { Box, Spinner } from '@chakra-ui/core';
import { useSession } from 'next-auth/client';
import GroupesHandler from '../components/groupes-parlementaires/GroupesHandler';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';

export default function GroupesParlementaires() {
  const [session, loading] = useSession();

  if (!session) {
    return 'Please log in';
  }

  if (loading) {
    return <Spinner size="xl" label="Loading user informations..." />;
  }

  return (
    <Box padding="0 7vw 70px">
      <GroupesHandler faunaToken={session.user.faunaDBToken} />
    </Box>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return { props: { session } };
}
