import { NextPage } from 'next';
import Head from 'next/head';
import { fetchObjectItems } from '../lib/api';
import { fetchAutoCompleteObjects } from '../lib/client-api';
import { IndexPageContent } from '../components';
import { DomainType, IListItem } from '../types';
import { getAppTitle, splitArrayIntoEqualChunks } from '../helper';
import { useObjectsData } from '../context';
interface IPageProps {
  chunkItems: IListItem[][];
  totalCount: number;
  domain: DomainType.Objects;
}

const HomePage: NextPage<IPageProps> = ({
  chunkItems,
  totalCount,
  domain,
}: IPageProps) => {
  return (
    <>
      <Head>
        <title>{getAppTitle('Objects')}</title>
        <meta
          name="description"
          content="Listing design objects from the Vitra Design Museum"
        />
      </Head>
      <IndexPageContent
        chunkItems={chunkItems}
        totalCount={totalCount}
        domain={domain}
        useData={useObjectsData}
        searchFunction={fetchAutoCompleteObjects}
      />
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const objects = await fetchObjectItems();
  const totalCount = objects.length;
  const chunkItems = splitArrayIntoEqualChunks(objects, 20);
  return {
    props: { chunkItems, totalCount, domain: DomainType.Objects },
  };
}
