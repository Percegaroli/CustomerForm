import React from 'react';
import Head from 'next/head';
import SignInForm from '../components/UI/Input/SignInForm';

export default function Home() {
  return (
    <>
      <Head>
        <title>Formulário</title>
      </Head>

      <SignInForm />
    </>
  );
}
