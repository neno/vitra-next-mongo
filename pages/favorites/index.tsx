import { NextPage } from 'next';
import Head from 'next/head';
import { useFavorites } from '../../hooks/useFavorites';
import { Aside, Heading, List, NothingFound } from '../../components';
import { DomainType } from '../../types';
import { getAppTitle } from '../../helper';

export const FavoritesPage: NextPage = () => {
  const {
    favoriteObjects,
    favoriteDesigners,
    favoriteManufacturers,
    favoritesCount,
  } = useFavorites();

  return (
    <>
      <Head>
        <title>{getAppTitle('Favorites')}</title>
        <meta
          name="description"
          content="Listing your favorite objects, designers and manufacturers"
        />
      </Head>
      <div className="pb-16">
        <Heading title="Favorites" designer="" />

        <Aside title="Objects">
          {favoriteObjects.length > 0 && (
            <List
              items={favoriteObjects}
              domain={DomainType.Objects}
              isFavorite
            />
          )}
          {favoriteObjects.length === 0 && (
            <NothingFound text="No favorite objects set." />
          )}
        </Aside>
        <Aside title="Designers">
          {favoriteDesigners.length > 0 && (
            <List
              items={favoriteDesigners}
              domain={DomainType.Designers}
              isFavorite
            />
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
              showImage={false}
              isFavorite
            />
          )}
          {favoriteManufacturers.length === 0 && (
            <NothingFound text="No favorite manufacturers set." />
          )}
        </Aside>
      </div>
    </>
  );
};

export default FavoritesPage;
