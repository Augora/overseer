import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/client';
import GitHubActionsOverview from '../components/github-actions/GitHubActionsOverview';

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className="container">
      <Head>
        <title>Dashboard Home</title>
      </Head>
      {loading ? (
        'Loading session informations.'
      ) : !session ? (
        'You must log in first.'
      ) : (
        <>
          <GitHubActionsOverview RepositoryName="Augora" />
          <GitHubActionsOverview RepositoryName="Nucleus" />
          <GitHubActionsOverview RepositoryName="Overseer" />
          <GitHubActionsOverview RepositoryName="Convey" />
        </>
      )}
    </div>
  );
}
