import { FC } from 'react';
import { IContentContainerProps } from './ContentContainer.types';
import styles from './ContentContainer.module.scss';

export const ContentContainer: FC<IContentContainerProps> = ({
  children,
  isSection = false,
  animate = false,
}) => {
  return (
    <div
      className={`border-t relative overflow-hidden ${animate && styles.item}`}
    >
      <div
        className={`max-w-screen-sm mx-auto px-4 md:px-0${
          isSection ? '' : ' h-20 md:h-24'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
