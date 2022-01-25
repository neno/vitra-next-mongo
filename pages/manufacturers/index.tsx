import type { NextPage } from 'next';
import { useCallback, useEffect, useState } from 'react';
import { fetchManufacturerItems } from '../../lib/api';
import { fetchAutoCompleteManufacturers } from '../../lib/client-api';
import { SearchForm, PageHeader, List } from '../../components';
import { DomainType, IListItem } from '../../types';
import { splitArrayIntoEqualChunks } from '../../helper';
import { useIntersect } from '../../hooks/use-intersect';
import { useManufacturersData } from '../../context';

interface IPageProps {
  chunkItems: IListItem[][];
  totalCount: number;
}

const ManufacturersPage: NextPage<IPageProps> = ({
  chunkItems,
  totalCount,
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
  } = useManufacturersData();

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
      <PageHeader>Listing Manufacturers</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteManufacturers}
        setSearchItems={setSearchItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        placeholder={`Search among ${totalCount} objects…`}
      />

      {searchItems && (
        <List
          items={searchItems}
          domain={DomainType.Manufacturers}
          showImage={false}
        />
      )}
      {listItems && listItems.length && (
        <div
          className="mt-[-1px]"
          style={!!searchItems ? { display: 'none' } : {}}
        >
          <List
            items={listItems}
            domain={DomainType.Manufacturers}
            showImage={false}
          />
        </div>
      )}
      <div ref={loadMoreRef}></div>
    </>
  );
};

export default ManufacturersPage;

export async function getStaticProps() {
  const manufacturers = await fetchManufacturerItems();
  const totalCount = manufacturers.length;
  const chunkItems = splitArrayIntoEqualChunks(manufacturers, 20);
  return {
    props: { chunkItems, totalCount },
  };
}
