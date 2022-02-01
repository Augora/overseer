import Head from 'next/head';
import React from 'react';
import { Box } from '@chakra-ui/react';
// import FileList from '../components/files/FileList';

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Files | Augora</title>
      </Head>
      <Box padding={{ base: '0 15px', md: '0 7vw' }}>
        {props.session === null ? 'You must log in first.' : 'WIP'}
        {/* <FileList /> */}
      </Box>
    </div>
  );
}
