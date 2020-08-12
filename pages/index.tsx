import Head from "next/head";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();
  if (!loading) console.log("mdr:", session);
  console.log(session && session.user.email);
  return (
    <div className="container">
      <Head>
        <title>Dashboard Home</title>
      </Head>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
        <>
          Signed in as {session.user.name} <br />
          <button onClick={signOut}>Sign out</button>
        </>
      )}
    </div>
  );
}
