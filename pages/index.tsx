import Head from 'next/head';
import React from 'react';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';
import GitHubWorkflowGrid from '../components/github-actions/GitHubWorkflowGrid';

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Dashboard Home</title>
      </Head>
      {props.session === null ? (
        'You must log in first.'
      ) : (
        <GitHubWorkflowGrid githubToken={props.session.user.accessToken} />
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
