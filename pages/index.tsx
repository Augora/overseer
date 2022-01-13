import Head from 'next/head';
import React from 'react';
import { NextPageContext } from 'next';
import { Box } from '@chakra-ui/react';
import isUndefined from 'lodash/isUndefined';
import isNull from 'lodash/isNull';

import supabase from '../lib/supabase/Client';
import GitHubWorkflowGrid from '../components/github-actions/GitHubWorkflowGrid';

export default function Home({ session }) {
  return (
    <div className="container">
      <Head>
        <title>Dashboard | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {isUndefined(session) || isNull(session) ? (
          'You must log in first.'
        ) : (
          <GitHubWorkflowGrid githubToken={session.user.accessToken} />
        )}
      </Box>
    </div>
  );
}
