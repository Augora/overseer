import Head from 'next/head';
import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import { Box } from '@chakra-ui/react';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import { Auth } from '@supabase/ui';

import GitHubWorkflowGrid from '../components/github-actions/GitHubWorkflowGrid';
import supabase from '../lib/supabase/Client';

export default function Home() {
  const { user, session } = Auth.useUser();
  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).then((res) => res.json());
    });
  });

  return (
    <div className="container">
      <Head>
        <title>Dashboard | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {isUndefined(user) || isNull(user) ? (
          'You must log in first.'
        ) : (
          <GitHubWorkflowGrid githubToken={session.provider_token} />
        )}
      </Box>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const { user, error, token, data } = await supabase.auth.api.getUserByCookie(req);

  if (error) {
    console.error(error);
  }

  // If there is a user, return it.
  return { props: { user, token, data } };
}
