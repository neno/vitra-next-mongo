import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchDesignerItems } from '../../lib/api';
import { fetchAutoCompleteObjects } from '../../lib/client-api';
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
  const { items, remainingItemsRef, loadMoreRef, setDoObserve } =
    useIntersect();
  remainingItemsRef.current = chunkItems;

  useEffect(() => {
    setDoObserve(!searchItems);
  }, [searchItems, setDoObserve]);

  return (
    <>
      <PageHeader>Designers</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteObjects}
        setSearchItems={setSearchItems}
        placeholder={`Search in ${total} designers`}
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
