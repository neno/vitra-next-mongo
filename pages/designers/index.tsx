import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchDesignerItems } from '../../lib/api';
import { fetchAutoCompleteDesigners } from '../../lib/client-api';
import { SearchForm, PageHeader, List } from '../../components';
import { DomainType, IListItem } from '../../types';
import { splitArrayIntoEqualChunks } from '../../helper';
import { useIntersect } from '../../hooks/use-intersect';

interface IPageProps {
  chunkItems: IListItem[][];
  total: number;
}

const DesignersPage: NextPage<IPageProps> = ({ chunkItems, total }) => {
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(null);
  const { items, loadMoreRef, setDoObserve } = useIntersect(chunkItems);

  useEffect(() => {
    setDoObserve(!searchItems);
  }, [searchItems, setDoObserve]);

  return (
    <>
      <PageHeader>Listing Designers</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteDesigners}
        setSearchItems={setSearchItems}
        placeholder={`Search among ${total} designers`}
      />
      {searchItems && (
        <List items={searchItems} domain={DomainType.Designers} />
      )}
      {items && items.length && (
        <div
          className="mt-[-1px]"
          style={!!searchItems ? { display: 'none' } : {}}
        >
          <List items={items} domain={DomainType.Designers} />
        </div>
      )}
      <div ref={loadMoreRef}></div>
    </>
  );
};

export default DesignersPage;

export async function getStaticProps() {
  const designers = await fetchDesignerItems();
  const total = designers.length;
  const chunkItems = splitArrayIntoEqualChunks(designers, 20);
  return {
    props: { chunkItems, total },
  };
}
