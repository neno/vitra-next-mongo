import { IListItem } from '../types';

export interface IVitraData {
  isNavOpen: boolean;
  favorites: {
    objects: IListItem[];
    designers: IListItem[];
    manufacturers: IListItem[];
  };
}

export interface IVitraContextProps {
  vitraData: IVitraData;
  setVitraData: (values: Partial<IVitraData>) => void;
  resetVitraData: () => void;
}
