import React, {
  createContext,
  useCallback,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { IVitraContextProps, IVitraData } from './VitraContext.types';

const initialVitraData: IVitraData = {
  favorites: {
    objects: [],
    designers: [],
    manufacturers: [],
  },
};

const VitraContext = createContext<IVitraContextProps>({
  vitraData: initialVitraData,
  setVitraData: (values: Partial<IVitraData>) => values,
  resetVitraData: () => null,
});

export default VitraContext;

export const VitraContextConsumer = VitraContext.Consumer;

export const VitraProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [vitraData, setData] = useState(initialVitraData);

  const setVitraData = useCallback((values: Partial<IVitraData>): void => {
    setData((prevData) => ({
      ...prevData,
      ...values,
    }));
  }, []);

  const resetVitraData = () => {
    setData(initialVitraData);
  };

  return (
    <VitraContext.Provider value={{ vitraData, setVitraData, resetVitraData }}>
      {children}
    </VitraContext.Provider>
  );
};

export const useVitraData = (): IVitraContextProps => useContext(VitraContext);
