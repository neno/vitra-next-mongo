import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { ContentContainer, Icon, NothingFound } from '..';
import { IconType, IListItem } from '../../types';
import { ISearchFormProps } from './SearchForm.types';
import { TailSpin } from 'svg-loaders-react';
import { useIsLarge } from '../../hooks/utils';

export const SearchForm: FC<ISearchFormProps> = ({
  searchFunction,
  setSearchItems,
  searchTerm,
  setSearchTerm,
  placeholder,
  setShowSkeleton,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [showNothingFound, setShowNothingFound] = useState(false);
  const isLarge = useIsLarge();

  const { isLoading } = useQuery(
    [searchFunction.name, { q: searchTerm }],
    () =>
      searchFunction(searchTerm).then((res: IListItem[]) => {
        setShowSkeleton(false);
        setSearchItems(res);
        if (res && res.length > 0) {
          setShowNothingFound(false);
        } else {
          setShowNothingFound(true);
        }
      }),
    {
      enabled: !!searchTerm && searchTerm.length > 2, // start searching only if there is an inputValue
    }
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchTerm(value);
    setShowSkeleton(value.length > 2);
    setShowNothingFound(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const reset = () => {
    setSearchTerm('');
    setSearchItems(null);
    setShowNothingFound(false);
  };

  useEffect(() => {
    if (formRef.current && searchTerm) {
      formRef.current.scrollIntoView();
    }
  }, [searchTerm]);

  return (
    <div className="fixed top-0 left-0 w-full border-b">
      <form onSubmit={handleSubmit} ref={formRef}>
        <ContentContainer animate>
          <div
            className={`flex relative items-center mx-auto h-full ${
              !isLarge ? 'mr-20' : ''
            }`}
          >
            <label className="sr-only" htmlFor="vitra-search">
              Find Objects
            </label>
            <div className="w-20 sm:w-24 h-20 sm:h-24 flex-none flex justify-center items-center">
              <Icon iconName={IconType.Search} size="2.5rem" />
            </div>
            <div className="flex-1 relative">
              <input
                id="vitra-search"
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleChange}
                className="w-full border h:12 md:h-14 text-2xl md:text-4xl leading-loose sm:ml-2 p-2 sm:mr-2 pr-12 focus:text-white focus:bg-black"
              />
              <button type="submit" className="sr-only">
                submit
              </button>
              <div
                className={`flex text-white absolute z-10 right-[1rem] top-[50%] mt-[-1.25rem] ${
                  !isLoading && 'hidden'
                }`}
              >
                <TailSpin />
              </div>
              <button
                onClick={reset}
                className={`flex z-10 text-white absolute right-0 top-[50%] mt-[-1.25rem] ${
                  !searchTerm || isLoading ? 'invisible' : ''
                }`}
                title="Clear search term"
              >
                <Icon iconName={IconType.Close} size="2.5rem" />
              </button>
            </div>
          </div>
        </ContentContainer>
        {showNothingFound && <NothingFound />}
      </form>
    </div>
  );
};
