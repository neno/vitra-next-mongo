import {
  IDesignerItemServer,
  IPersonServer,
  IPersonObjectRelation,
  IManufacturerItemServer,
} from './../types/serverTypes';
import {
  IListItem,
  IObjectItemServer,
  IObjectRelation,
  IObjectServer,
  IPersonRelation,
  IObject,
  IObjectItem,
  PersonType,
  IPerson,
} from '../types';

export function getAsString(value: string | string[]): string {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export const splitArrayIntoEqualChunks = (
  arr: any[],
  size: number
): any[] | any[][] => {
  const res: any[][] = [];
  while (arr.length > 0) {
    const chunk = arr.splice(0, size);
    res.push(chunk);
  }

  return res;
};

export const stripHtmlTags = (originalString: string) => {
  if (!originalString) return '';
  return originalString.replace(/(<([^>]+)>)/gi, '');
};

export const createCommaSeparatedString = (...items: string[]): string => {
  return items.filter((item: string) => item).join(', ');
};

export const mapObjectDocumentsToListItems = (
  documents: IObjectItemServer[]
): IListItem[] => {
  return documents.map((doc: IObjectItemServer) => ({
    id: doc._id,
    title: createCommaSeparatedString(
      doc?.ObjObjectTitleTxt ?? '',
      doc?.ObjDateGrp_DateFromTxt ?? ''
    ),
    text: doc?.ObjDesigner ?? '',
    image: doc?.ObjMultimediaRel?.[0]?.MulUrls?.[0]?.me ?? '',
  }));
};

export const mapDocumentToObject = (doc: IObjectServer): IObject => {
  return {
    id: doc._id,
    fullTitle: createCommaSeparatedString(
      doc.ObjObjectTitleTxt ?? '',
      doc.ObjDateGrp_DateFromTxt ?? ''
    ),
    title: doc.ObjObjectTitleTxt ?? '',
    dating: doc.ObjDateTxt ?? '',
    designer: doc.ObjDesigner ?? '',
    image: doc.ObjMultimediaRel?.[0]?.MulUrl ?? null,
    thumbnail: doc.ObjMultimediaRel?.[0]?.MulUrls?.[0]?.me ?? '',
    material: doc.ObjMaterialTechniqueTxt ?? '',
    dimensions: doc.ObjDimension ?? '',
    designed: doc.ObjDateGrp_DateFromTxt ?? '',
    firstProduction: doc.ObjDateGrp_Notes2Clb ?? '',
    type: doc.ObjCategoryVoc ?? '',
    inventoryNo: doc.ObjObjectNumberGrp_Part1Txt ?? '',
    description: doc.ObjMarkdown
      ? doc.ObjMarkdown.replace(/<br><br>/g, '<br>')
      : '',
    metaDescription: createCommaSeparatedString(
      doc.ObjDesigner ?? '',
      doc.ObjObjectTitleTxt ?? '',
      doc.ObjCategoryVoc ?? '',
      doc.ObjDateGrp_DateFromTxt ?? '',
      doc.ObjMaterialTechniqueTxt ?? '',
      doc.ObjFullText ?? ''
    ),
    relatedObjects:
      doc.ObjObjectRel?.map((obj: IObjectRelation) => ({
        id: obj.ObjId,
        title: createCommaSeparatedString(
          obj.ObjObjectTitleTxt ?? '',
          obj.ObjDateGrp_DateFromTxt ?? ''
        ),
        text: obj.ObjDesigner ?? '',
        image: obj.ObjUrl ?? null,
      })) ?? [],
    relatedDesigners:
      doc.ObjPersonRel?.filter(
        (per: IPersonRelation) => per.PerTypeVoc === PersonType.Designer
      ).map((per: IPersonRelation) => ({
        id: per.PerId,
        title: per.PerNameTxt ?? '',
        text: per.PerDatingTxt ?? '',
        image: per.PerUrl ?? null,
      })) ?? [],
    relatedManufacturers:
      doc.ObjPersonRel?.filter(
        (per: IPersonRelation) => per.PerTypeVoc === PersonType.Manufacturer
      ).map((per: IPersonRelation) => ({
        id: per.PerId,
        title: per.PerNameTxt ?? '',
        text:
          [per.PerBirthPlaceCity, per.PerBirthPlaceCountry].join(', ') ?? '',
        image: per.PerUrl ?? null,
      })) ?? [],
  };
};

export const mapDesignerDocumentsToListItems = (
  documents: IDesignerItemServer[]
): IListItem[] => {
  return documents.map((doc: IDesignerItemServer) => ({
    id: doc._id,
    title: doc?.PerNameSortedTxt ?? '',
    text: doc?.PerDatingTxt ?? '',
    image: doc?.PerMultimediaRel?.[0]?.MulUrls?.[0]?.me ?? '',
  }));
};

export const mapManufacturerDocumentsToListItems = (
  documents: IManufacturerItemServer[]
): IListItem[] => {
  return documents.map((doc: IManufacturerItemServer) => ({
    id: doc._id,
    title: doc?.PerNameTxt ?? '',
    text: createCommaSeparatedString(
      doc.PerBirthPlaceCity ?? '',
      doc.PerNationalityTxt ?? ''
    ),
    image: doc?.PerMultimediaRel?.[0]?.MulUrls?.[0]?.me ?? '',
  }));
};

export const mapDocumentToPerson = (doc: IPersonServer): IPerson => {
  return {
    id: doc._id,
    name: doc.PerNameTxt ?? '',
    nameSorted: doc.PerNameSortedTxt ?? '',
    dating: doc.PerDatingTxt ?? '',
    image: doc?.PerMultimediaRel?.[0]?.MulUrl ?? null,
    thumbnail: doc?.PerMultimediaRel?.[0]?.MulUrls?.[0]?.me ?? '',
    place: doc.PerBirthPlaceCity ?? '',
    country: doc.PerBirthPlaceCountry ?? '',
    type: doc.PerTypeVoc ?? '',
    text: doc.PerMarkdown ?? '',
    metaDescription: stripHtmlTags(doc.PerFullText ?? ''),
    relatedObjects:
      doc.PerObjectRel?.map((obj: IPersonObjectRelation) => ({
        id: obj.ObjId,
        title: obj.ObjObjectTitleTxt ?? '',
        text: obj.ObjDesigner ?? '',
        image: obj.ObjUrl ?? null,
      })) ?? [],
  };
};

export const mapObjectToListItem = (obj: IObject): IListItem => ({
  id: obj.id,
  title: createCommaSeparatedString(obj.title, obj.dating),
  text: obj.designer,
  image: obj.thumbnail,
});

export const mapDesignerToListItem = (person: IPerson): IListItem => ({
  id: person.id,
  title: person.nameSorted,
  text: person.dating,
  image: person.thumbnail,
});

export const mapManufacturerToListItem = (person: IPerson): IListItem => ({
  id: person.id,
  title: person.name,
  text: createCommaSeparatedString(person.place, person.country),
  image: person.thumbnail,
});

export const getAppTitle = (title: string) => {
  return `${title} - Vitra Design Museum`;
};
