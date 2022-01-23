export interface IObjectDetailsProps {
  fields: {
    title: string;
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
  | 'dating'
  | 'designer'
  | 'type'
  | 'designed'
  | 'firstProduction'
  | 'material'
  | 'dimensions'
  | 'inventoryNo';
