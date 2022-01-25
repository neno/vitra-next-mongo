import React, { createContext, ReactNode, useContext } from 'react';
import { IDomainContextProps } from '../types';
import { DomainContextData, DomainContextProvider } from './shared';

const ObjectsContext = createContext<IDomainContextProps>(DomainContextData);

export default ObjectsContext;

export const ObjectsContextConsumer = ObjectsContext.Consumer;

export const ObjectsProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => (
  <DomainContextProvider DomainContext={ObjectsContext}>
    {children}
  </DomainContextProvider>
);

export const useObjectsData = (): IDomainContextProps =>
  useContext(ObjectsContext);
