import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { ContentContainer, Icon, NothingFound } from '..';
import { IconType, IListItem } from '../../types';
import { ISearchFormProps } from './SearchForm.types';
import { TailSpin } from 'svg-loaders-react';
import { useVitraData } from '../../context/VitraContext';

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
  const [isFocused, setIsFocused] = useState(false);
  const {
    vitraData: { isNavOpen },
  } = useVitraData();

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

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (formRef.current && searchTerm) {
      formRef.current.scrollIntoView();
    }
  }, [searchTerm]);

  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      className="mt-[-2px] sm:mt-0 relative border-b"
    >
      <ContentContainer animate>
        <div
          className={`flex relative items-center h-full max-w-[calc(100%_-_80px)]  ${
            isNavOpen
              ? 'max-w-[calc(100%_-_80px)]'
              : 'md:max-w-[calc(100%_-_20px)] lg:max-w-full'
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
              onFocus={onFocus}
              onBlur={onBlur}
              className="w-full border h-12 md:h-14 text-2xl md:text-4xl leading-loose p-2 pr-12 focus:text-white focus:bg-black"
            />
            <button type="submit" className="sr-only">
              submit
            </button>
            <div
              className={`flex text-white absolute z-10 right-4 top-[50%] mt-[-1.25rem] ${
                !isLoading && 'hidden'
              }`}
            >
              <TailSpin />
            </div>
            <button
              onClick={reset}
              className={`flex z-10 absolute right-2 top-[50%] mt-[-1.25rem] 
              ${isFocused ? 'text-white' : 'text-black'}
              ${!searchTerm || isLoading ? 'invisible' : ''}`}
              title="Clear search term"
            >
              <Icon iconName={IconType.Close} size="2.5rem" />
            </button>
          </div>
        </div>
      </ContentContainer>
      {showNothingFound && <NothingFound />}
    </form>
  );
};
