import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { IDomainData, IListItem, IObjectContextProps } from '../types';

const initialObjectsData: IDomainData = {
  data: [],
  totalCount: 0,
  searchTerm: '',
  remainingItemsRef: null,
  searchItems: null,
  listItems: [],
};

const ObjectsContext = createContext<IObjectContextProps>({
  data: initialObjectsData.data,
  totalCount: initialObjectsData.totalCount,
  searchTerm: initialObjectsData.searchTerm,
  searchItems: initialObjectsData.searchItems,
  remainingItemsRef: initialObjectsData.remainingItemsRef,
  listItems: initialObjectsData.listItems,
  setData: (values: IListItem[][]) => values,
  setTotalCount: (value: number) => value,
  setSearchTerm: (term: string) => term,
  setSearchItems: (values: IListItem[] | null) => values,
  setListItems: (values: IListItem[]) => values,
});

export default ObjectsContext;

export const ObjectsContextConsumer = ObjectsContext.Consumer;

export const ObjectsProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [data, setData] = useState<IListItem[][]>(initialObjectsData.data);
  const [totalCount, setTotalCount] = useState<number>(
    initialObjectsData.totalCount
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    initialObjectsData.searchTerm
  );
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(
    initialObjectsData.searchItems
  );
  const remainingItemsRef = useRef<IListItem[][] | null>(
    initialObjectsData.remainingItemsRef
  );
  const [listItems, setListItems] = useState<IListItem[]>(
    initialObjectsData.listItems
  );

  useEffect(() => {
    if (data.length > 0) {
      remainingItemsRef.current = data;
    }
  }, [data]);

  return (
    <ObjectsContext.Provider
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
    </ObjectsContext.Provider>
  );
};

export const useObjectsData = (): IObjectContextProps =>
  useContext(ObjectsContext);
