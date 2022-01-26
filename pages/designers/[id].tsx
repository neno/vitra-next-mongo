import type { NextPage } from 'next';
import Head from 'next/head';
import { fetchAllDesignerIds, fetchPerson } from '../../lib/api';
import {
  Aside,
  DetailImage,
  Heading,
  List,
  RichText,
  Toolbar,
} from './../../components';
import { DomainType, IPerson } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import {
  createCommaSeparatedString,
  getAppTitle,
  mapDesignerToListItem,
} from '../../helper';

interface IPath {
  params: { id: string };
}

interface IGetStaticPathsProps {
  paths: IPath[];
  fallback: boolean;
}

interface IPageProps {
  person: IPerson;
}

const Designer: NextPage<IPageProps> = ({ person }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const onToggleFavorite = () => {
    toggleFavorite(mapDesignerToListItem(person), DomainType.Designers);
  };

  return (
    <>
      <Head>
        <title>{getAppTitle(person.name)}</title>
        {person.metaDescription && (
          <meta
            name="description"
            content={`${createCommaSeparatedString(
              person.name,
              person.dating
            )} ${person.metaDescription}`}
          />
        )}
      </Head>
      <div className="pb-16">
        {person.image && <DetailImage src={person.image} alt={person.name} />}

        <Heading title={person.name} designer={person.dating} />

        <Toolbar
          prevUrl={`/${DomainType.Designers}`}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(person.id, DomainType.Designers)}
          domain={DomainType.Designers}
        />

        {person.text && <RichText text={person.text} />}

        {person.relatedObjects.length > 0 && (
          <Aside title="Objects">
            <List items={person.relatedObjects} domain={DomainType.Objects} />
          </Aside>
        )}
      </div>
    </>
  );
};

export default Designer;

export async function getStaticPaths(): Promise<IGetStaticPathsProps> {
  const designerIds = await fetchAllDesignerIds();
  const paths = designerIds?.map(({ _id }) => ({
    params: {
      id: _id.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: IPath) {
  const person: IPerson = await fetchPerson(params.id);
  return {
    props: {
      person,
    },
  };
}
