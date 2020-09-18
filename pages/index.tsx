import Head from 'next/head';
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();
  return (
    <div className="container">
      <Head>
        <title>Dashboard Home</title>
      </Head>
    </div>
  );
}
