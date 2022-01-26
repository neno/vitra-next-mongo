import type { NextPage } from 'next';
import Head from 'next/head';
import { fetchAllManufacturerIds, fetchPerson } from '../../lib/api';
import { Aside, Heading, List, RichText, Toolbar } from './../../components';
import { DomainType, IPerson } from '../../types';
import {
  createCommaSeparatedString,
  getAppTitle,
  mapManufacturerToListItem,
} from '../../helper';
import { useFavorites } from '../../hooks/useFavorites';

interface IPath {
  params: { id: string };
}

interface IGetStaticPathsProps {
  paths: IPath[];
  fallback: boolean;
}

interface IPageProps {
  person: IPerson;
  domain: DomainType.Manufacturers;
}

const Designer: NextPage<IPageProps> = ({ person }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const onToggleFavorite = () => {
    toggleFavorite(mapManufacturerToListItem(person), DomainType.Manufacturers);
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
              person.place,
              person.country
            )} ${person.metaDescription}`}
          />
        )}
      </Head>
      <div className="pb-16">
        <Heading
          title={person.name}
          designer={createCommaSeparatedString(person.place, person.country)}
        />
        <Toolbar
          prevUrl={`/${DomainType.Manufacturers}`}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite(person.id, DomainType.Manufacturers)}
          domain={DomainType.Manufacturers}
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
  const manufacturerIds = await fetchAllManufacturerIds();
  const paths = manufacturerIds?.map(({ _id }) => ({
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
      domain: DomainType.Manufacturers, // enable the context per domain
    },
  };
}
