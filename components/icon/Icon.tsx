import { FC } from 'react';
import { IconType } from '../../types';
import { IIconProps } from './Icon.types';
import { Close, Down, Logo, Menu, Next, Prev, Search, Up } from './icons';
import styles from './Icon.module.scss';

const icons = {
  [IconType.Close]: Close,
  [IconType.Down]: Down,
  [IconType.Logo]: Logo,
  [IconType.Menu]: Menu,
  [IconType.Next]: Next,
  [IconType.Prev]: Prev,
  [IconType.Search]: Search,
  [IconType.Up]: Up,
};

export const Icon: FC<IIconProps> = ({ iconName }) => {
  const Ico = icons[iconName];
  return (
    <i className={styles.icon}>
      <Ico />
    </i>
  );
};
