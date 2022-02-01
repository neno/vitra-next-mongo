import { PersonType } from './enums';

export interface IObjectItem {
  id: number;
  fullTitle: string;
  designer: string;
  thumbnail: string | null;
}

export interface IObject extends IObjectItem {
  image: string | null;
  title: string;
  designed: string;
  material: string;
  dimensions: string;
  dating: string;
  firstProduction: string;
  type: string;
  inventoryNo: string;
  description: string;
  metaDescription: string;
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
  thumbnail: string | null;
  place: string;
  country: string;
  type: PersonType;
  text: string;
  metaDescription: string;
  relatedObjects: IRelatedItem[];
}

export interface IDomainData {
  data: IListItem[][];
  totalCount: number;
  remainingItemsRef: any;
  searchTerm: string;
  searchItems: IListItem[] | null;
  listItems: IListItem[];
  showSkeleton: boolean;
}

export interface IDomainContextProps extends IDomainData {
  setData: (values: IListItem[][]) => void;
  setTotalCount: (value: number) => void;
  setSearchTerm: (term: string) => void;
  setSearchItems: (values: IListItem[] | null) => void;
  setListItems: (values: IListItem[]) => void;
  setShowSkeleton: (value: boolean) => void;
}
