import React, { createContext, ReactNode, useContext } from 'react';
import { IDomainContextProps } from '../types';
import { DomainContextData, DomainContextProvider } from './shared';

const ManufacturersContext =
  createContext<IDomainContextProps>(DomainContextData);

export default ManufacturersContext;

export const ManufacturersContextConsumer = ManufacturersContext.Consumer;

export const ManufacturersProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => (
  <DomainContextProvider DomainContext={ManufacturersContext}>
    {children}
  </DomainContextProvider>
);

export const useManufacturersData = (): IDomainContextProps =>
  useContext(ManufacturersContext);
