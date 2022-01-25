import type { NextPage } from 'next';
import { fetchAllDesignerIds, fetchPerson } from '../../lib/api';
import {
  Aside,
  Heading,
  List,
  PersonImage,
  RichText,
  Toolbar,
} from './../../components';
import { DomainType, IPerson, IRelatedItem } from '../../types';
import { useFavorites } from '../../hooks/useFavorites';
import { mapDesignerToListItem } from '../../helper';

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
    <div className="pb-16">
      {person.image && <PersonImage src={person.image} alt={person.name} />}

      <Heading title={person.name} designer={person.dating} />

      <Toolbar
        prevUrl={`/${DomainType.Designers}`}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite(person.id, DomainType.Designers)}
      />

      {person.text && <RichText text={person.text} />}

      {person.relatedObjects.length > 0 && (
        <Aside title="Objects">
          <List items={person.relatedObjects} domain={DomainType.Objects} />
        </Aside>
      )}
    </div>
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
