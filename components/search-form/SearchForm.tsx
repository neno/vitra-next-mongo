import { FC, FormEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import { ContentContainer } from '..';
import { autoCompleteObjects } from '../../lib/api-calls';
import { IListItem, IObjectItem } from '../../types';
import { ISearchFormProps } from './SearchForm.types';

export const SearchForm: FC<ISearchFormProps> = ({
  searchFunction,
  setSearchItems,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState<IListItem[]>([]);
  const router = useRouter();

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

  // const { isLoading } = useQuery(
  //   ['autoCompleteObjects', { q: searchTerm }],
  //   () =>
  //     autoCompleteObjects(searchTerm).then((res: IObjectItem[]) => {
  //       console.log('autoCompleteObjects', res);
  //       setOptions(res);
  //     }),
  //   {
  //     enabled: !!searchTerm && searchTerm.length > 2, // start searching only if there is an inputValue
  //   }
  // );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // if (searchTerm) {
    //   router.push({
    //     pathname: `/search/${searchTerm}`,
    //   });
    //   setSearchTerm('');
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ContentContainer>
        <div className="flex items-center mx-auto h-full">
          <label className="sr-only" htmlFor="vitra-search">
            Find Objects
          </label>
          <input
            id="vitra-search"
            type="text"
            placeholder="Search…"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h:12 md:h-14 text-2xl md:text-4xl leading-loose"
          />
        </div>
      </ContentContainer>
    </form>
  );
};
