import { NextPage } from 'next';
import Head from 'next/head';
import { fetchManufacturerItems } from '../../lib/api';
import { IndexPageContent } from '../../components';
import { DomainType, IListItem } from '../../types';
import { getAppTitle, splitArrayIntoEqualChunks } from '../../helper';
import { useManufacturersData } from '../../context';

interface IPageProps {
  chunkItems: IListItem[][];
  totalCount: number;
  domain: DomainType.Manufacturers;
}

const ManufacturersPage: NextPage<IPageProps> = ({
  chunkItems,
  totalCount,
  domain,
}: IPageProps) => {
  return (
    <>
      <Head>
        <title>{getAppTitle('Manufacturers')}</title>
        <meta
          name="description"
          content="Listing manufacturers of the design objects from the Vitra Design Museum"
        />
      </Head>
      <IndexPageContent
        chunkItems={chunkItems}
        totalCount={totalCount}
        domain={domain}
        useData={useManufacturersData}
      />
    </>
  );
};

export default ManufacturersPage;

export async function getStaticProps() {
  const manufacturers = await fetchManufacturerItems();
  const totalCount = manufacturers.length;
  const chunkItems = splitArrayIntoEqualChunks(manufacturers, 20);
  return {
    props: { chunkItems, totalCount, domain: DomainType.Manufacturers },
  };
}
