import type { NextPage } from 'next';
import { useState } from 'react';
import { fetchObjectItems } from 'lib/api';
import { fetchAutoCompleteObjects } from 'lib/client-api';
import { SearchForm, ListItem, PageHeader } from '../components';
import { IListItem } from '../types';

interface IPageProps {
  objects: IListItem[];
}

const Home: NextPage<IPageProps> = ({ objects }) => {
  const [searchItems, setSearchItems] = useState<IListItem[] | null>(null);
  const [items, setItems] = useState<IListItem[]>(objects.slice(0, 20));

  return (
    <>
      <PageHeader>Objects</PageHeader>
      <SearchForm
        searchFunction={fetchAutoCompleteObjects}
        setSearchItems={setSearchItems}
      />
      {searchItems && (
        <div>
          {searchItems.map((obj) => (
            <ListItem
              key={obj.id}
              id={obj.id}
              title={obj.title}
              imageUrl={obj.imageUrl}
              text={obj.text}
            />
          ))}
        </div>
      )}
      <div style={!!searchItems ? { display: 'none' } : {}}>
        {items.map((obj) => (
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
