import { NextPage } from 'next';
import Head from 'next/head';
import { fetchObjectItems } from '@api';
import { fetchAutoCompleteObjects } from '@clientApi';
import { IListItem } from '@types';
import { getAppTitle } from '@helper';
import { SWRConfig } from 'swr';
import { ErrorBoundary, ListingPage } from '@components';
import { Suspense } from 'react';
interface IPageProps {
  fallback: IListItem[];
}

const HomePage: NextPage<IPageProps> = ({ fallback }: IPageProps) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ErrorBoundary fallback={<h2>Could not fetch objects</h2>}>
        <Suspense fallback="Loading…">
          <ListingPage />
        </Suspense>
      </ErrorBoundary>
    </SWRConfig>
  );
};

export default HomePage;

export async function getStaticProps() {
  const initialObjects = await fetchObjectItems();
  return {
    props: { fallback: initialObjects },
  };
}
