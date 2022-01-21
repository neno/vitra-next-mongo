import { FC } from 'react';
import { ListItem } from 'components';
import { IListProps } from './List.types';

export const List: FC<IListProps> = ({ items }) => {
  return (
    <>
      {items.map(({ id, title, imageUrl, text }) => (
        <ListItem
          key={id}
          id={id}
          title={title}
          imageUrl={imageUrl}
          text={text}
        />
      ))}
    </>
  );
};
