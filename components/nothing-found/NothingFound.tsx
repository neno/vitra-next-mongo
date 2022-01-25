import { ContentContainer } from '../../components';
import { FC } from 'react';
import { INothingFoundProps } from './NothingFound.types';

const defaultText =
  'Sorry, we could not find anything containing the provided search term. Please try again.';

export const NothingFound: FC<INothingFoundProps> = ({
  text = defaultText,
}) => {
  return (
    <ContentContainer>
      <p className="pt-8 text-xl md:text-xl">{text}</p>
    </ContentContainer>
  );
};
