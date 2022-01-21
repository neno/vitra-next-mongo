import { fetchAllObjectIds, fetchObject } from 'lib/api';
import type { NextPage } from 'next';

import {
  Aside,
  ContentContainer,
  DetailImage,
  Heading,
  List,
  ListItem,
  ObjectDetails,
  RichText,
} from '../../components';
// import { fetchObjectById } from '../../lib/api-calls';
import { DomainType, IObject, IRelatedItem } from '../../types';

interface IPath {
  params: { id: string };
}

interface IGetStaticPathsProps {
  paths: IPath[];
  fallback: boolean;
}

interface IPageProps {
  object: IObject;
}

const Object: NextPage<IPageProps> = ({ object }) => {
  return (
    <div className="pb-16">
      {object.image && <DetailImage src={object.image} alt={object.title} />}

      <Heading title={object.fullTitle} designer={object.designer} />

      <ObjectDetails
        fields={{
          title: object.title,
          subTitle: object.subTitle,
          designed: object.designed,
          designer: object.designer,
          type: object.type,
          firstProduction: object.firstProduction,
          dating: object.dating,
          material: object.material,
          dimensions: object.dimensions,
          inventoryNo: object.inventoryNo,
        }}
      />

      {object.description && <RichText text={object.description} />}

      {object.relatedObjects.length > 0 && (
        <Aside title="Objects">
          <List items={object.relatedObjects} domain={DomainType.Objects} />
        </Aside>
      )}
      {object.relatedDesigners.length > 0 && (
        <Aside title="Designers">
          <List items={object.relatedDesigners} domain={DomainType.Objects} />
        </Aside>
      )}
      {object.relatedManufacturers.length > 0 && (
        <Aside title="Manufacturer">
          <List
            items={object.relatedManufacturers}
            domain={DomainType.Objects}
          />
        </Aside>
      )}
    </div>
  );
};

export default Object;

export async function getStaticPaths(): Promise<IGetStaticPathsProps> {
  const objectIds = await fetchAllObjectIds();

  // const companies = await getCompanies();
  const paths = objectIds?.map(({ _id }) => ({
    params: {
      id: _id.toString(),
    },
  }));
  // const paths = [{ params: { id: '41592' } }];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: IPath) {
  const object: IObject = await fetchObject(params.id);
  return {
    props: {
      object,
    },
  };
}
