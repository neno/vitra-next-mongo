import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { ContentContainer, Icon, NothingFound } from '..';
import { useScrollDirection } from '../../hooks/use-scroll-direction';
import { IconType, IListItem } from '../../types';
import { ISearchFormProps } from './SearchForm.types';
import styles from './SearchForm.module.css';
import { Circles, Rings } from 'svg-loaders-react';

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
  const { scrollDirection, isSticky } = useScrollDirection();
  let cssClass = styles.sticky;
  if (isSticky && scrollDirection === 'up') {
    cssClass = [styles.sticky, styles.stickyVisible].join(' ');
  }
  if (searchTerm) {
    cssClass = styles.relative;
  }

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
    <form onSubmit={handleSubmit} className={cssClass} ref={formRef}>
      <ContentContainer>
        <div className="flex relative items-center mx-auto h-full">
          <label className="sr-only" htmlFor="vitra-search">
            Find Objects
          </label>
          <Icon iconName={IconType.Search} size="2.5rem" />
          <input
            id="vitra-search"
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={handleChange}
            className="w-full h:12 md:h-14 text-2xl md:text-4xl leading-loose ml-2 p-2 mr-2 pr-12 focus:text-white focus:bg-black"
          />
          {isLoading && (
            <div className="absolute top-[50%] mt-[-23px] right-0 z-5000 translate-x-[-36px]">
              <Rings fill="black" />
            </div>
          )}
          <button
            onClick={reset}
            className={`flex ${!searchTerm ? 'invisible' : ''}`}
            title="Clear search term"
          >
            <Icon iconName={IconType.Close} />
          </button>
        </div>
      </ContentContainer>
      {showNothingFound && <NothingFound />}
    </form>
  );
};
