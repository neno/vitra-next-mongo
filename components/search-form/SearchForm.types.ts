import { IListItem, TSearchFunction } from './../../types/clientTypes';

export interface ISearchFormProps {
  searchFunction: TSearchFunction;
  setSearchItems: (data: IListItem[] | null) => void;
  placeholder: string;
}
