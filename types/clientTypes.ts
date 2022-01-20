export interface IObjectItem {
  id: number;
  fullTitle: string;
  designer: string;
  image: string | null;
}

export interface IObject extends IObjectItem {
  title: string;
  subTitle: string;
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
  imageUrl: string | null;
  title: string;
  text: string;
}

export type TSearchFunction = (term: string) => Promise<IListItem[]>;
