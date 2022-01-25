import { NextPage } from 'next';
import { fetchManufacturerItems } from '../../lib/api';
import { IndexPageContent } from '../../components';
import { DomainType, IListItem } from '../../types';
import { splitArrayIntoEqualChunks } from '../../helper';
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
    <IndexPageContent
      chunkItems={chunkItems}
      totalCount={totalCount}
      domain={domain}
      useData={useManufacturersData}
    />
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
