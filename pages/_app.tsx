import React from 'react';
import type { AppProps /* , AppContext */ } from 'next/app';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps): React.FC<AppProps> => (
  <Component {...pageProps} />
);

export default MyApp;
