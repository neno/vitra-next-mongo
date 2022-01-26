import type { NextPage } from 'next';
import Head from 'next/head';
import { fetchDesignerItems } from '../../lib/api';
import { fetchAutoCompleteDesigners } from '../../lib/client-api';
import { IndexPageContent } from '../../components';
import { DomainType, IListItem } from '../../types';
import { getAppTitle, splitArrayIntoEqualChunks } from '../../helper';
import { useDesignersData } from '../../context';

interface IPageProps {
  chunkItems: IListItem[][];
  totalCount: number;
  domain: DomainType.Designers;
}

const DesignersPage: NextPage<IPageProps> = ({
  chunkItems,
  totalCount,
  domain,
}: IPageProps) => {
  return (
    <>
      <Head>
        <title>{getAppTitle('Designers')}</title>
        <meta
          name="description"
          content="Listing designers showcased in the Vitra Design Museum"
        />
      </Head>
      <IndexPageContent
        chunkItems={chunkItems}
        totalCount={totalCount}
        domain={domain}
        useData={useDesignersData}
        searchFunction={fetchAutoCompleteDesigners}
      />
    </>
  );
};

export default DesignersPage;

export async function getStaticProps() {
  const designers = await fetchDesignerItems();
  const totalCount = designers.length;
  const chunkItems = splitArrayIntoEqualChunks(designers, 20);
  return {
    props: { chunkItems, totalCount, domain: DomainType.Designers },
  };
}
