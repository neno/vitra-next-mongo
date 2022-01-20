import type { AppProps } from 'next/app';
import { QueryClientProvider, QueryClient } from 'react-query';
import '../public/fonts/fonts.css';
import 'tailwindcss/tailwind.css';
import { Layout } from '../components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default MyApp;
