import { FC, FormEvent, useState } from 'react';
import { useQuery } from 'react-query';
import { ContentContainer, Icon } from '..';
import { IconType, IListItem } from '../../types';
import { ISearchFormProps } from './SearchForm.types';

export const SearchForm: FC<ISearchFormProps> = ({
  searchFunction,
  setSearchItems,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoading } = useQuery(
    [searchFunction.name, { q: searchTerm }],
    () =>
      searchFunction(searchTerm).then((res: IListItem[]) => {
        setSearchItems(res);
      }),
    {
      enabled: !!searchTerm && searchTerm.length > 2, // start searching only if there is an inputValue
    }
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const reset = () => {
    setSearchTerm('');
    setSearchItems(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <ContentContainer>
        <div className="flex items-center mx-auto h-full">
          <label className="sr-only" htmlFor="vitra-search">
            Find Objects
          </label>
          <Icon iconName={IconType.Search} size="2.5rem" />
          <input
            id="vitra-search"
            type="text"
            placeholder="Search…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h:12 md:h-14 text-2xl md:text-4xl leading-loose ml-2 mr-2"
          />
          {searchTerm && (
            <button onClick={reset} className="flex" title="Clear search term">
              <Icon iconName={IconType.Close} />
            </button>
          )}
        </div>
      </ContentContainer>
    </form>
  );
};
