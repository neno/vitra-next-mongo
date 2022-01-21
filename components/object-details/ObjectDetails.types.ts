export interface IObjectDetailsProps {
  fields: {
    title: string;
    subTitle: string;
    dating: string;
    designer: string;
    type: string;
    designed: string;
    firstProduction: string;
    material: string;
    dimensions: string;
    inventoryNo: string;
  };
  showDetailsInitially: boolean;
}

export enum ObjectDefListFieldType {
  title = 'title',
  subTitle = 'subTitle',
  dating = 'dating',
  designer = 'designer',
  type = 'type',
  designed = 'designed',
  firstProduction = 'firstProduction',
  material = 'material',
  dimensions = 'dimensions',
  inventoryNo = 'inventoryNo',
}

export type TObjectDefListFieldType =
  | 'title'
  | 'subTitle'
  | 'dating'
  | 'designer'
  | 'type'
  | 'designed'
  | 'firstProduction'
  | 'material'
  | 'dimensions'
  | 'inventoryNo';

// export interface IObjectDefListFields {
//   title: string;
//   subTitle: string;
//   dating: string;
//   designer: string;
//   type: string;
//   designed: string;
//   firstProduction: string;
//   material: string;
//   dimensions: string;
//   inventoryNo: string;
// }
