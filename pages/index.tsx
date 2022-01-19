import Head from 'next/head';
import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import { Box } from '@chakra-ui/react';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';
import { Auth } from '@supabase/ui';

import GitHubWorkflowGrid from '../components/github-actions/GitHubWorkflowGrid';
import supabase from '../lib/supabase/Client';

export default function Home({ errorMessage }) {
  const { session } = Auth.useUser();

  return (
    <div className="container">
      <Head>
        <title>Dashboard | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {isUndefined(session) || isNull(session) ? (
          'You must log in first.'
        ) : (
          <GitHubWorkflowGrid githubToken={session.provider_token} />
        )}
      </Box>
    </div>
  );
}
