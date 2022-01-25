import { useVitraData } from './../context/VitraContext';
import { IListItem, DomainType } from '../types';

export const useFavorites = () => {
  const {
    vitraData: { favorites },
    setVitraData,
  } = useVitraData();

  const isFavorite = (id: number, domain: DomainType): boolean => {
    return favorites[domain].map((el) => el.id).includes(id);
  };

  const addToFavorites = (item: IListItem, domain: DomainType) => {
    setVitraData({
      favorites: {
        ...favorites,
        [domain]: [...favorites[domain], item],
      },
    });
  };

  const removeFromFavorites = (item: IListItem, domain: DomainType) => {
    setVitraData({
      favorites: {
        ...favorites,
        [domain]: favorites[domain].filter((fav) => fav.id !== item.id),
      },
    });
  };

  const toggleFavorite = (item: IListItem, domain: DomainType) => {
    if (isFavorite(item.id, domain)) {
      removeFromFavorites(item, domain);
    } else {
      addToFavorites(item, domain);
    }
  };

  const favoritesCount = () => {
    return (
      favorites[DomainType.Objects].length +
      favorites[DomainType.Designers].length +
      favorites[DomainType.Manufacturers].length
    );
  };

  return {
    toggleFavorite,
    isFavorite,
    favoriteObjects: favorites[DomainType.Objects],
    favoriteDesigners: favorites[DomainType.Designers],
    favoriteManufacturers: favorites[DomainType.Manufacturers],
    favoritesCount,
  };
};
