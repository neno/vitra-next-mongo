import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { fetchManufacturerItems } from '../../lib/api';
import { fetchAutoCompleteManufacturers } from '../../lib/client-api';
import { SearchForm, PageHeader, List } from '../../components';
import { DomainType, IListItem } from '../../types';
import { splitArrayIntoEqualChunks } from '../../helper';
import { useIntersect } from '../../hooks/use-intersect';

interface IPageProps {
  chunkItems: IListItem[][];
  total: number;
}

const ManufacturersPage: NextPage<IPageProps> = ({ chunkItems, total }) => {
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(null);
  const { items, remainingItemsRef, loadMoreRef, setDoObserve } =
    useIntersect();
  remainingItemsRef.current = chunkItems;

  useEffect(() => {
    setDoObserve(!searchItems);
  }, [searchItems, setDoObserve]);

  return (
    <>
      <PageHeader>Manufacturers</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteManufacturers}
        setSearchItems={setSearchItems}
        placeholder={`Search in ${total} manufacturers`}
      />
      {searchItems && (
        <List
          items={searchItems}
          domain={DomainType.Manufacturers}
          showImage={false}
        />
      )}
      {items && items.length && (
        <div
          className="mt-[-1px]"
          style={!!searchItems ? { display: 'none' } : {}}
        >
          <List
            items={items}
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
  const total = manufacturers.length;
  const chunkItems = splitArrayIntoEqualChunks(manufacturers, 20);
  return {
    props: { chunkItems, total },
  };
}
