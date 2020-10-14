import Head from 'next/head';
import React from 'react';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';
import GitHubWorkflowGrid from '../components/github-actions/GitHubWorkflowGrid';
import { Box } from '@chakra-ui/core';

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Dashboard Home</title>
      </Head>
      {props.session === null ? (
        'You must log in first.'
      ) : (
        <Box padding="0 7vw">
          <GitHubWorkflowGrid githubToken={props.session.user.accessToken} />
        </Box>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  if (session !== null) {
    return {
      props: {
        session,
      },
    };
  } else {
    return {
      props: {
        session,
      },
    };
  }
}
