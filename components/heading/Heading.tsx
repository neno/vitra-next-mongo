import { ContentContainer } from '../../components';
import { FC } from 'react';
import { IHeadingProps } from './Heading.types';

export const Heading: FC<IHeadingProps> = ({
  title,
  designer,
  isTop = false,
}) => {
  return (
    <ContentContainer isSection>
      <h1 className={`p-4 ${isTop ? 'md:py-5' : 'md:py-8'} md:px-0`}>
        <span className="block text-2xl md:text-4xl py-2">{title}</span>
        {designer && (
          <span className="block text-2xl md:text-4xl text-gray-400 py-2">
            {designer}
          </span>
        )}
      </h1>
    </ContentContainer>
  );
};
