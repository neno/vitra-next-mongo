import { FC, Fragment } from 'react';
import {
  IObjectDetailsProps,
  TObjectDefListFieldType,
} from './ObjectDetails.types';

const fieldsOrder: TObjectDefListFieldType[] = [
  'title',
  'subTitle',
  'designer',
  'type',
  'designed',
  'firstProduction',
  'dating',
  'material',
  'dimensions',
  'inventoryNo',
];

export const ObjectDetails: FC<IObjectDetailsProps> = ({ fields }) => {
  return (
    <dl>
      {fieldsOrder.map((key: TObjectDefListFieldType) => {
        if (fields[key]) {
          return (
            <Fragment key={key}>
              <dt>{key}</dt>
              <dd>{fields[key]}</dd>
            </Fragment>
          );
        }
        return null;
      })}
    </dl>
  );
};
