import { FC } from 'react';
import { IContentContainerProps } from './ContentContainer.types';

export const ContentContainer: FC<IContentContainerProps> = ({
  children,
  isSection = false,
}) => {
  return (
    <div className="border-t overflow-hidden">
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
