import type { NextPage } from 'next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { fetchDesignerItems } from '../../lib/api';
import { fetchAutoCompleteDesigners } from '../../lib/client-api';
import {
  SearchForm,
  PageHeader,
  List,
  ListItemSkeleton,
} from '../../components';
import { DomainType, IListItem } from '../../types';
import { splitArrayIntoEqualChunks } from '../../helper';
import { useIntersect } from '../../hooks/use-intersect';
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
}) => {
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
    showSkeleton,
    setShowSkeleton,
  } = useDesignersData();

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

  const showSearchItems = useMemo(() => {
    return !showSkeleton && searchItems;
  }, [showSkeleton, searchItems]);

  return (
    <>
      <PageHeader>Listing Designers</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteDesigners}
        setSearchItems={setSearchItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={`Search among ${totalCount} ${domain}…`}
        setShowSkeleton={setShowSkeleton}
      />
      {showSkeleton && <ListItemSkeleton />}
      {showSearchItems && <List items={searchItems ?? []} domain={domain} />}
      {listItems.length > 0 && (
        <div
          className="mt-[-1px]"
          style={!!searchItems ? { display: 'none' } : {}}
        >
          <List items={listItems} domain={domain} />
        </div>
      )}
      <div ref={loadMoreRef}></div>
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
