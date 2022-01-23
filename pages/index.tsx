import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchObjectItems } from '../lib/api';
import { fetchAutoCompleteObjects } from '../lib/client-api';
import { SearchForm, PageHeader, List } from '../components';
import { DomainType, IListItem } from '../types';
import { splitArrayIntoEqualChunks } from '../helper';
import { useIntersect } from '../hooks/use-intersect';

interface IPageProps {
  chunkItems: IListItem[][];
  total: number;
}

const HomePage: NextPage<IPageProps> = ({ chunkItems, total }) => {
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(null);
  const { items, remainingItemsRef, loadMoreRef, setDoObserve } =
    useIntersect();
  remainingItemsRef.current = [...chunkItems];

  useEffect(() => {
    setDoObserve(!searchItems);
  }, [searchItems, setDoObserve]);

  return (
    <>
      <PageHeader>Listing Objects</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteObjects}
        setSearchItems={setSearchItems}
        placeholder={`Search in ${total} objects…`}
      />
      {searchItems && <List items={searchItems} domain={DomainType.Objects} />}
      {items && items.length && (
        <div
          className="mt-[-1px]"
          style={!!searchItems ? { display: 'none' } : {}}
        >
          <List items={items} domain={DomainType.Objects} />
        </div>
      )}
      <div ref={loadMoreRef}></div>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const objects = await fetchObjectItems();
  const total = objects.length;
  const chunkItems = splitArrayIntoEqualChunks(objects, 20);
  return {
    props: { chunkItems, total },
  };
}
