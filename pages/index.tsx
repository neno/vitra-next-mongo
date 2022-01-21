import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import { fetchObjectItems } from 'lib/api';
import { fetchAutoCompleteObjects } from 'lib/client-api';
import { SearchForm, PageHeader, List } from '../components';
import { IListItem } from '../types';
import { splitArrayIntoEqualChunks } from 'helper';
import { useIntersect } from 'hooks/use-intersect';

interface IPageProps {
  chunkItems: IListItem[][];
}

const Home: NextPage<IPageProps> = ({ chunkItems }) => {
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(null);
  const { items, remainingItemsRef, loadMoreRef, setDoObserve } =
    useIntersect();
  remainingItemsRef.current = chunkItems;

  useEffect(() => {
    setDoObserve(!searchItems);
  }, [searchItems, setDoObserve]);

  return (
    <>
      <PageHeader>Objects</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteObjects}
        setSearchItems={setSearchItems}
      />
      {searchItems && <List items={searchItems} />}
      {items && items.length && (
        <div
          className="mt-[-1px]"
          style={!!searchItems ? { display: 'none' } : {}}
        >
          <List items={items} />
        </div>
      )}
      <div ref={loadMoreRef}></div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const objects = await fetchObjectItems();
  const chunkItems = splitArrayIntoEqualChunks(objects, 20);
  return {
    props: { chunkItems },
  };
}
