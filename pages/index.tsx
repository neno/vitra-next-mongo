import { NextPage } from 'next';
import { fetchObjectItems } from '../lib/api';
import { IndexPageContent } from '../components';
import { DomainType, IListItem } from '../types';
import { splitArrayIntoEqualChunks } from '../helper';
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
    <IndexPageContent
      chunkItems={chunkItems}
      totalCount={totalCount}
      domain={domain}
      useData={useObjectsData}
    />
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
