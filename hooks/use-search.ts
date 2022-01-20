import { useState } from 'react';
import { useQuery } from 'react-query';
import { IListItem, TSearchFunction } from 'types';

export const useSearch = (searchFunction: TSearchFunction) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(null);

  const { isLoading } = useQuery(
    [searchFunction.name, { q: searchTerm }],
    () =>
      searchFunction(searchTerm).then((res: IListItem[]) => {
        console.log('autoCompleteObjects', res);
        setSearchItems(res);
      }),
    {
      enabled: !!searchTerm && searchTerm.length > 2, // start searching only if there is an inputValue
    }
  );

  return { searchItems, setSearchTerm };
};
