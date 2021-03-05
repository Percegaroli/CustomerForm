import React from 'react';
import Head from 'next/head';
import SignUp from '../components/SignUp';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sign Up Form</title>
      </Head>

      <SignUp />
    </>
  );
}
