import { IListItem, TSearchFunction } from './../../types/clientTypes';

export interface ISearchFormProps {
  searchFunction: TSearchFunction;
  setSearchItems: (data: IListItem[] | null) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
  setShowSkeleton: (value: boolean) => void;
}
