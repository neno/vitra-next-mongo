import { FC } from 'react';
import { IconType } from '../../types';
import { IIconProps } from './Icon.types';
import {
  Close,
  Collection,
  Down,
  Highlight,
  Logo,
  Menu,
  Next,
  Prev,
  Search,
  Up,
} from './icons';
import styles from './Icon.module.scss';

const icons = {
  [IconType.Close]: Close,
  [IconType.Collection]: Collection,
  [IconType.Down]: Down,
  [IconType.Highlight]: Highlight,
  [IconType.Logo]: Logo,
  [IconType.Menu]: Menu,
  [IconType.Next]: Next,
  [IconType.Prev]: Prev,
  [IconType.Search]: Search,
  [IconType.Up]: Up,
};

export const Icon: FC<IIconProps> = ({ iconName, size }) => {
  const Ico = icons[iconName];
  return (
    <i
      className={styles.icon}
      style={size ? { width: size, height: size } : {}}
    >
      <Ico />
    </i>
  );
};
