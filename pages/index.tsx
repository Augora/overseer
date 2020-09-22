import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/client';
import GitHubActionsOverview from '../components/github-actions/GitHubActionsOverview';
import { Spinner, Skeleton } from '@chakra-ui/core';

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className="container">
      <Head>
        <title>Dashboard Home</title>
      </Head>
      {!loading && !session ? (
        'You must log in first.'
      ) : (
        <>
          <Skeleton isLoaded={!loading}>
            <GitHubActionsOverview RepositoryName="Augora" />
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <GitHubActionsOverview RepositoryName="Nucleus" />
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <GitHubActionsOverview RepositoryName="Overseer" />
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <GitHubActionsOverview RepositoryName="Convey" />
          </Skeleton>
        </>
      )}
    </div>
  );
}
