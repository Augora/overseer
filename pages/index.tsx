import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/client';
import GitHubActionsOverview from '../components/github-actions/GitHubActionsOverview';
import { Skeleton } from '@chakra-ui/core';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';

export default function Home(props) {
  console.log(props);
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

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return { props: { session } };
}
