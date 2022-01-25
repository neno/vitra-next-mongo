import { ReactNode, useEffect, useRef, useState } from 'react';
import { IDomainContextProps, IDomainData, IListItem } from '../types';

export const initialData: IDomainData = {
  data: [],
  totalCount: 0,
  searchTerm: '',
  remainingItemsRef: null,
  searchItems: null,
  listItems: [],
};

export const DomainContextData = {
  data: initialData.data,
  totalCount: initialData.totalCount,
  searchTerm: initialData.searchTerm,
  searchItems: initialData.searchItems,
  remainingItemsRef: initialData.remainingItemsRef,
  listItems: initialData.listItems,
  setData: (values: IListItem[][]) => values,
  setTotalCount: (value: number) => value,
  setSearchTerm: (term: string) => term,
  setSearchItems: (values: IListItem[] | null) => values,
  setListItems: (values: IListItem[]) => values,
};

export const DomainContextProvider = ({
  DomainContext,
  children,
}: {
  DomainContext: React.Context<IDomainContextProps>;
  children: ReactNode;
}): JSX.Element => {
  const [data, setData] = useState<IListItem[][]>(initialData.data);
  const [totalCount, setTotalCount] = useState<number>(initialData.totalCount);
  const [searchTerm, setSearchTerm] = useState<string>(initialData.searchTerm);
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(
    initialData.searchItems
  );
  const remainingItemsRef = useRef<IListItem[][] | null>(
    initialData.remainingItemsRef
  );
  const [listItems, setListItems] = useState<IListItem[]>(
    initialData.listItems
  );

  useEffect(() => {
    if (data.length > 0) {
      remainingItemsRef.current = data;
    }
  }, [data]);

  return (
    <DomainContext.Provider
      value={{
        data,
        setData,
        totalCount,
        setTotalCount,
        searchTerm,
        setSearchTerm,
        searchItems,
        setSearchItems,
        remainingItemsRef,
        listItems,
        setListItems,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
};
