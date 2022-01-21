import { useScrollDirection } from 'hooks/use-scroll-direction';
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { ContentContainer, Icon, NothingFound } from '..';
import { IconType, IListItem } from '../../types';
import { ISearchFormProps } from './SearchForm.types';
import styles from './SearchForm.module.css';

export const SearchForm: FC<ISearchFormProps> = ({
  searchFunction,
  setSearchItems,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
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
            onChange={handleChange}
            className="w-full h:12 md:h-14 text-2xl md:text-4xl leading-loose ml-2 mr-2"
          />
          {searchTerm && (
            <button onClick={reset} className="flex" title="Clear search term">
              <Icon iconName={IconType.Close} />
            </button>
          )}
        </div>
      </ContentContainer>
      {showNothingFound && <NothingFound />}
    </form>
  );
};
