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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <VitraProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <ObjectsProvider>
            <DesignersProvider>
              <ManufacturersProvider>
                <Component {...pageProps} />
              </ManufacturersProvider>
            </DesignersProvider>
          </ObjectsProvider>
        </Layout>
      </QueryClientProvider>
    </VitraProvider>
  );
}

export default MyApp;
