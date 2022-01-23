import { ContentContainer } from '../../components';
import { FC } from 'react';

export const PageHeader: FC = ({ children }) => {
  return <h1 className="sr-only">{children}</h1>;
};
