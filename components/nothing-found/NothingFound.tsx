import { ContentContainer } from '../../components';
import { FC } from 'react';

export const NothingFound: FC = () => {
  return (
    <ContentContainer>
      <p className="pt-8 text-xl md:text-xl">
        Sorry, we could not find anything containing the provided search term.
        Please try again.
      </p>
    </ContentContainer>
  );
};
