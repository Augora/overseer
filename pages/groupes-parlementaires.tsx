import { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/core';
import { useSession } from 'next-auth/client';
import GroupesHandler from '../components/groupes-parlementaires/GroupesHandler';

export default function GroupesParlementaires() {
  const [session, loading] = useSession();

  if (!session) {
    return 'Please log in';
  }

  if (loading) {
    return <Spinner size="xl" label="Loading user informations..." />;
  }

  return <GroupesHandler faunaToken={session.user.faunaDBToken} />;
}
