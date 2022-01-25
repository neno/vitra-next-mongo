import { NextPage } from 'next';
import { useFavorites } from '../../hooks/useFavorites';
import { Aside, Heading, List, NothingFound } from '../../components';
import { DomainType } from '../../types';

export const FavoritesPage: NextPage = () => {
  const {
    favoriteObjects,
    favoriteDesigners,
    favoriteManufacturers,
    favoritesCount,
  } = useFavorites();

  return (
    <div className="pb-16">
      <Heading title="Favorites" designer="" />

      <Aside title="Objects">
        {favoriteObjects.length > 0 && (
          <List items={favoriteObjects} domain={DomainType.Objects} />
        )}
        {favoriteObjects.length === 0 && (
          <NothingFound text="No favorite objects set." />
        )}
      </Aside>
      <Aside title="Designers">
        {favoriteDesigners.length > 0 && (
          <List items={favoriteDesigners} domain={DomainType.Designers} />
        )}
        {favoriteDesigners.length === 0 && (
          <NothingFound text="No favorite designers set." />
        )}
      </Aside>
      <Aside title="Manufacturers">
        {favoriteManufacturers.length > 0 && (
          <List
            items={favoriteManufacturers}
            domain={DomainType.Manufacturers}
          />
        )}
        {favoriteManufacturers.length === 0 && (
          <NothingFound text="No favorite manufacturers set." />
        )}
      </Aside>
    </div>
  );
};

export default FavoritesPage;
