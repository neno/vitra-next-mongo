import { FC } from 'react';
import { IHoverButtonProps } from './HoverButton.types';
import styles from './HoverButton.module.scss';

export const HoverButton: FC<IHoverButtonProps> = ({
  Tag,
  children,
  className,
}) => {
  return <Tag className={`${className} ${styles.hoverButton}`}>{children}</Tag>;
};
