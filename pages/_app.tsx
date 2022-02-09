import React from 'react';
import type { AppProps } from 'next/app';
import '../public/fonts/fonts.css';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import { Layout } from '../components';
import { VitraProvider } from '../context/VitraContext';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <VitraProvider>
      <Layout>
        <SWRConfig
          value={{
            fetcher: (url: string) => fetch(url).then((r) => r.json()),
            suspense: true,
          }}
        >
          <Component {...pageProps} />
        </SWRConfig>
      </Layout>
    </VitraProvider>
  );
}

export default MyApp;
