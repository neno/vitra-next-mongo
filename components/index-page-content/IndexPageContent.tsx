import { useEffect, useCallback, useMemo } from 'react';
import { fetchAutoCompleteObjects } from '../../lib/client-api';
import { useIntersect } from '../../hooks/use-intersect';
import { IndexPageContentProps } from './IndexPageContent.types';
import {
  SearchForm,
  PageHeader,
  List,
  ListItemSkeleton,
} from '../../components';
import { DomainType } from '../../types';
import { useIsLarge } from '../../hooks/utils';

export const IndexPageContent = ({
  chunkItems,
  totalCount,
  domain,
  useData,
  searchFunction,
}: IndexPageContentProps) => {
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
  } = useData();

  const addMoreItems = useCallback(() => {
    if (remainingItemsRef.current?.length > 0) {
      const chunk = remainingItemsRef.current.splice(0, 1).flat();
      setListItems([...listItems, ...chunk]);
    }
  }, [remainingItemsRef, listItems, setListItems]);

  const { loadMoreRef, setDoObserve } = useIntersect(chunkItems, addMoreItems);
  const isLarge = useIsLarge();

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

  const hideListItems = useMemo(() => {
    return showSkeleton || showSearchItems;
  }, [showSkeleton, showSearchItems]);

  return (
    <>
      <PageHeader>{domain}</PageHeader>
      <section>
        <h2 className="sr-only">Find {domain}</h2>
        <SearchForm
          searchFunction={searchFunction}
          setSearchItems={setSearchItems}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder={
            isLarge
              ? `Search among ${totalCount} ${domain}…`
              : `Search ${domain}…`
          }
          setShowSkeleton={setShowSkeleton}
        />
        {showSkeleton && <ListItemSkeleton />}
        {showSearchItems && (
          <List
            items={searchItems ?? []}
            domain={domain}
            showImage={domain !== DomainType.Manufacturers}
          />
        )}
      </section>
      <section>
        <h2 className="sr-only">Listing all {domain}</h2>
        {listItems.length > 0 && (
          <div className={` ${hideListItems && 'hidden'}`}>
            <List
              items={listItems}
              domain={domain}
              showImage={domain !== DomainType.Manufacturers}
            />
          </div>
        )}
        <div ref={loadMoreRef}></div>
      </section>
    </>
  );
};
