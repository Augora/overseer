import Head from 'next/head';
import React from 'react';
import { useSession } from 'next-auth/client';
import GitHubActionsOverview from '../components/github-actions/GitHubActionsOverview';
import { Skeleton } from '@chakra-ui/core';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';
import { GetWorkflows } from '../lib/github/Workflows';

export default function Home(props) {
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
            <GitHubActionsOverview
              RepositoryName="Augora"
              prefecthedData={props.augoraData}
              GitHubToken={props.session.user.accessToken}
            />
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <GitHubActionsOverview
              RepositoryName="Nucleus"
              prefecthedData={props.nucleusData}
              GitHubToken={props.session.user.accessToken}
            />
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <GitHubActionsOverview
              RepositoryName="Overseer"
              prefecthedData={props.overseerData}
              GitHubToken={props.session.user.accessToken}
            />
          </Skeleton>
          <Skeleton isLoaded={!loading}>
            <GitHubActionsOverview
              RepositoryName="Convey"
              prefecthedData={props.conveyData}
              GitHubToken={props.session.user.accessToken}
            />
          </Skeleton>
        </>
      )}
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);
  const [augoraData, nucleusData, overseerData, conveyData] = await Promise.all([
    GetWorkflows(session.user.accessToken, 'Augora'),
    GetWorkflows(session.user.accessToken, 'Nucleus'),
    GetWorkflows(session.user.accessToken, 'Overseer'),
    GetWorkflows(session.user.accessToken, 'Convey'),
  ]);

  return {
    props: {
      session,
      augoraData,
      nucleusData,
      overseerData,
      conveyData,
    },
  };
}
