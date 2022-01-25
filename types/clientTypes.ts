import { PersonType } from './enums';

export interface IObjectItem {
  id: number;
  fullTitle: string;
  designer: string;
  image: string | null;
}

export interface IObject extends IObjectItem {
  title: string;
  designed: string;
  material: string;
  dimensions: string;
  dating: string;
  firstProduction: string;
  type: string;
  inventoryNo: string;
  description: string;
  relatedObjects: IRelatedItem[];
  relatedDesigners: IRelatedItem[];
  relatedManufacturers: IRelatedItem[];
}

export interface IRelatedItem {
  id: number;
  image: string | null;
  title: string;
  text: string;
}

export interface IListItem {
  id: number;
  image: string | null;
  title: string;
  text: string;
}

export type TSearchFunction = (term: string) => Promise<IListItem[]>;

export interface IPerson {
  id: number;
  name: string;
  nameSorted: string;
  dating: string;
  image: string | null;
  place: string;
  country: string;
  type: PersonType;
  text: string;
  relatedObjects: IRelatedItem[];
}

export interface IDomainData {
  data: IListItem[][];
  totalCount: number;
  remainingItemsRef: any;
  searchTerm: string;
  searchItems: IListItem[] | null;
  listItems: IListItem[];
}

export interface IDomainContextProps extends IDomainData {
  setData: (values: IListItem[][]) => void;
  setTotalCount: (value: number) => void;
  setSearchTerm: (term: string) => void;
  setSearchItems: (values: IListItem[] | null) => void;
  setListItems: (values: IListItem[]) => void;
}
