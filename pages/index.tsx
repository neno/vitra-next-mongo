import { useEffect, useCallback } from 'react';
import { fetchObjectItems } from '../lib/api';
import { fetchAutoCompleteObjects } from '../lib/client-api';
import { SearchForm, PageHeader, List, Layout } from '../components';
import { DomainType, IListItem } from '../types';
import { splitArrayIntoEqualChunks } from '../helper';
import { useIntersect } from '../hooks/use-intersect';
import { useObjectsData } from '../context';
interface IPageProps {
  chunkItems: IListItem[][];
  totalCount: number;
}

const HomePage = ({ chunkItems, totalCount }: IPageProps) => {
  const {
    data,
    setData,
    searchItems,
    setSearchItems,
    searchTerm,
    setSearchTerm,
    remainingItemsRef,
    setListItems,
    listItems,
  } = useObjectsData();

  const addMoreItems = useCallback(() => {
    if (remainingItemsRef.current?.length > 0) {
      const chunk = remainingItemsRef.current.splice(0, 1).flat();
      setListItems([...listItems, ...chunk]);
    }
  }, [remainingItemsRef, listItems, setListItems]);

  const { loadMoreRef, setDoObserve } = useIntersect(chunkItems, addMoreItems);

  useEffect(() => {
    if (data.length === 0) {
      setData(chunkItems);
    }
  }, [data, setData, chunkItems]);

  useEffect(() => {
    setDoObserve(!searchItems);
  }, [searchItems, setDoObserve]);

  return (
    <>
      <PageHeader>Listing Objects</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteObjects}
        setSearchItems={setSearchItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={`Search among ${totalCount} objects…`}
      />
      {searchItems && <List items={searchItems} domain={DomainType.Objects} />}
      {listItems && listItems.length && (
        <div
          className="mt-[-1px]"
          style={!!searchItems ? { display: 'none' } : {}}
        >
          <List items={listItems} domain={DomainType.Objects} />
        </div>
      )}
      <div ref={loadMoreRef}></div>
    </>
  );
};

export default HomePage;

export async function getStaticProps() {
  const objects = await fetchObjectItems();
  const totalCount = objects.length;
  const chunkItems = splitArrayIntoEqualChunks(objects, 20);
  return {
    props: { chunkItems, totalCount },
  };
}
