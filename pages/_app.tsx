import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import '../public/fonts/fonts.css';
import 'tailwindcss/tailwind.css';
import '../styles/global.css';
import { Layout } from '../components';
import { VitraProvider } from '../context/VitraContext';
import {
  ObjectsProvider,
  DesignersProvider,
  ManufacturersProvider,
} from '../context';

import { DomainType } from '../types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const providers = {
  [DomainType.Objects]: ObjectsProvider,
  [DomainType.Designers]: DesignersProvider,
  [DomainType.Manufacturers]: ManufacturersProvider,
};

function MyApp({ Component, pageProps }: AppProps) {
  const DomainProvider = pageProps.domain
    ? providers[pageProps.domain as DomainType]
    : React.Fragment;

  return (
    <VitraProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <DomainProvider>
            <Component {...pageProps} />
          </DomainProvider>
        </Layout>
      </QueryClientProvider>
    </VitraProvider>
  );
}

export default MyApp;
