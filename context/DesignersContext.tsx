import React, { createContext, ReactNode, useContext } from 'react';
import { IDomainContextProps } from '../types';
import { DomainContextData, DomainContextProvider } from './shared';

const DesignersContext = createContext<IDomainContextProps>(DomainContextData);

export default DesignersContext;

export const DesignersContextConsumer = DesignersContext.Consumer;

export const DesignersProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => (
  <DomainContextProvider DomainContext={DesignersContext}>
    {children}
  </DomainContextProvider>
);

export const useDesignersData = (): IDomainContextProps =>
  useContext(DesignersContext);
