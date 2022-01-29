import { FC } from 'react';
import { ListItem } from '../../components';
import { IListProps } from './List.types';

export const List: FC<IListProps> = ({
  items,
  domain,
  showImage = true,
  isFavorite = false,
}) => {
  return (
    <>
      {items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          domain={domain}
          showImage={showImage}
          isFavorite={isFavorite}
        />
      ))}
    </>
  );
};
