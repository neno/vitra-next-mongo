import { ContentContainer } from '../../components';
import { FC } from 'react';

export const PageHeader: FC = ({ children }) => {
  return (
    <ContentContainer>
      <h1 className="text-2xl md:text-4xl flex items-center h-full">
        {children}
      </h1>
    </ContentContainer>
  );
};
