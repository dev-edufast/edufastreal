import React from 'react';
import type { AppProps } from 'next/app';
import '../global.css';
import '../base.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
