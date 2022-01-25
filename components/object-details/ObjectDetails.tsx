import { ContentContainer, Icon } from '../../components';
import { FC, Fragment, useState } from 'react';
import { IconType } from '../../types';
import {
  IObjectDetailsProps,
  TObjectDefListFieldType,
} from './ObjectDetails.types';

const fieldsOrder: TObjectDefListFieldType[] = [
  'title',
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
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <section>
      <ContentContainer isSection>
        <button
          onClick={toggleShowDetails}
          className="block relative w-full"
          title={`Show / hide object details`}
        >
          <h2 className="flex w-full items-center justify-between pb-2 pt-2 text-gray-400 text-xl md:text-xl">
            <span>Object details</span>
            <Icon iconName={showDetails ? IconType.Up : IconType.Down} />
          </h2>
        </button>
      </ContentContainer>
      {showDetails && (
        <ContentContainer isSection>
          <dl className="overflow-hidden py-4">
            {fieldsOrder.map((key: TObjectDefListFieldType) => {
              if (fields[key]) {
                return (
                  <Fragment key={key}>
                    <dt className="uppercase pt-2 font-bold text-gray-400">
                      {key}
                    </dt>
                    <dd className="pb-2">{fields[key]}</dd>
                  </Fragment>
                );
              }
              return null;
            })}
          </dl>
        </ContentContainer>
      )}
    </section>
  );
};
