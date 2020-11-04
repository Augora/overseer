import Head from 'next/head';
import React from 'react';
import { getSession } from 'next-auth/client';
import { NextPageContext } from 'next';
import { Box } from '@chakra-ui/core';
import FileList from '../components/files/FileList';

export default function Home(props) {
  return (
    <div className="container">
      <Head>
        <title>Files | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {props.session === null ? 'You must log in first.' : <FileList />}
      </Box>
    </div>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const session = await getSession(ctx);

  return { props: { session } };
}
