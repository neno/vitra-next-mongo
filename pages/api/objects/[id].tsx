import type { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  DetailImage,
  Heading,
  ListItem,
  ObjectDetails,
} from '../../components';
import { fetchObjectById } from '../../lib/api-calls';
import { IObject, IRelatedItem } from '../../types';

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
    <div>
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

      {object.description && (
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>
          {object.description}
        </ReactMarkdown>
      )}
      <aside>
        <h2>Objects</h2>
        {object.relatedObjects.map((rel: IRelatedItem) => (
          <ListItem
            key={rel.id}
            id={rel.id}
            imageUrl={rel.image}
            title={rel.title}
            text={rel.text}
          />
        ))}
      </aside>
      <aside>
        <h2>Designer</h2>
        {object.relatedDesigners.map((rel: IRelatedItem) => (
          <ListItem
            key={rel.id}
            id={rel.id}
            imageUrl={rel.image}
            title={rel.title}
            text={rel.text}
          />
        ))}
      </aside>
      <aside>
        <h2>Manufacturer</h2>
        {object.relatedManufacturers.map((rel: IRelatedItem) => (
          <ListItem
            key={rel.id}
            id={rel.id}
            imageUrl={rel.image}
            title={rel.title}
            text={rel.text}
          />
        ))}
      </aside>

      {/* <pre>{JSON.stringify(object, null, 2)}</pre> */}
    </div>
  );
};

export default Object;

export async function getStaticPaths(): Promise<IGetStaticPathsProps> {
  // const companies = await getCompanies();
  // const paths = companies?.map((company) => ({
  //   params: {
  //     slug: company.slug,
  //     region: company.regionSlug,
  //     district: company.districtSlug,
  //     industry: company.industrySlug,
  //   },
  // }));
  const paths = [{ params: { id: '41592' } }];

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: IPath) {
  const object: IObject = await fetchObjectById(params.id);
  return {
    props: {
      object,
    },
  };
}
