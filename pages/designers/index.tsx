import type { NextPage } from 'next';
import { fetchDesignerItems } from '../../lib/api';
import { IndexPageContent } from '../../components';
import { DomainType, IListItem } from '../../types';
import { splitArrayIntoEqualChunks } from '../../helper';
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
    <IndexPageContent
      chunkItems={chunkItems}
      totalCount={totalCount}
      domain={domain}
      useData={useDesignersData}
    />
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
