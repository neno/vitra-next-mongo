import { useSearch } from 'hooks/use-search';
import { fetchObjectItems } from 'lib/api';
import { fetchAutoCompleteObjects } from 'lib/client-api';
import type { NextPage } from 'next';
import { useState } from 'react';
import { ContentContainer, SearchForm, ListItem } from '../components';
import { IListItem, IObjectItem } from '../types';

interface IPageProps {
  objects: IListItem[];
}

const Home: NextPage<IPageProps> = ({ objects }) => {
  // const { searchItems, setSearchTerm } = useSearch(fetchAutoCompleteObjects);
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(null);
  return (
    <>
      <ContentContainer>
        <h1 className="text-2xl md:text-4xl flex items-center h-full">
          Objects
        </h1>
      </ContentContainer>
      <SearchForm
        searchFunction={fetchAutoCompleteObjects}
        setSearchItems={setSearchItems}
      />
      <div>
        {(searchItems ? searchItems : objects).map((obj) => (
          <ListItem
            key={obj.id}
            id={obj.id}
            title={obj.title}
            imageUrl={obj.imageUrl}
            text={obj.text}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const objects = await fetchObjectItems();
  return {
    props: { objects },
  };
}
