import {
  IDesignerItemServer,
  IPersonServer,
  IPersonObjectRelation,
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

export const mapDocumentsToObjectItems = (
  documents: IObjectItemServer[]
): IObjectItem[] => {
  return documents.map((doc: IObjectItemServer) => ({
    id: doc._id,
    fullTitle: createTitleString(
      doc?.ObjObjectTitleTxt ?? '',
      doc?.ObjObjectTitleSubTxt ?? '',
      doc?.ObjDateGrp_DateFromTxt ?? ''
    ),
    designer: doc?.ObjDesigner ?? '',
    highlight: doc?.ObjHighlight ?? '',
    image: doc?.ObjMultimediaRel?.[0]?.MulUrl ?? '',
  }));
};

export const mapObjectDocumentsToListItems = (
  documents: IObjectItemServer[]
): IListItem[] => {
  return documents.map((doc: IObjectItemServer) => ({
    id: doc._id,
    title: createTitleString(
      doc?.ObjObjectTitleTxt ?? '',
      doc?.ObjObjectTitleSubTxt ?? '',
      doc?.ObjDateGrp_DateFromTxt ?? ''
    ),
    text: doc?.ObjDesigner ?? '',
    image: doc?.ObjMultimediaRel?.[0]?.MulUrl ?? '',
  }));
};

export function mapDocumentToObject(doc: IObjectServer): IObject {
  return {
    id: doc._id,
    fullTitle: createTitleString(
      doc?.ObjObjectTitleTxt ?? '',
      doc?.ObjObjectTitleSubTxt ?? '',
      doc?.ObjDateGrp_DateFromTxt ?? ''
    ),
    title: doc?.ObjObjectTitleTxt ?? '',
    subTitle: doc?.ObjObjectTitleSubTxt ?? '',
    dating: doc?.ObjDateTxt ?? '',
    designer: doc?.ObjDesigner ?? '',
    image: doc?.ObjMultimediaRel?.[0]?.MulUrl ?? null,
    material: doc.ObjMaterialTechniqueTxt ?? '',
    dimensions: doc.ObjDimension ?? '',
    designed: doc.ObjDateGrp_DateFromTxt ?? '',
    firstProduction: doc.ObjDateGrp_Notes2Clb ?? '',
    type: doc.ObjCategoryVoc ?? '',
    inventoryNo: doc.ObjObjectNumberGrp_Part1Txt ?? '',
    description: doc.ObjMarkdown
      ? doc.ObjMarkdown.replace(/<br><br>/g, '<br>')
      : '',
    relatedObjects:
      doc.ObjObjectRel?.map((obj: IObjectRelation) => ({
        id: obj.ObjId,
        title: createTitleString(
          obj.ObjObjectTitleTxt ?? '',
          obj.ObjObjectTitleSubTxt ?? '',
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
}

export const createTitleString = (
  title: string,
  subTitle: string,
  designed: string
): string => {
  const str = `${title} ${subTitle}`.trim();
  return str ? `${str}, ${designed}` : designed;
};

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

export const mapDesignerDocumentsToListItems = (
  documents: IDesignerItemServer[]
): IListItem[] => {
  return documents.map((doc: IDesignerItemServer) => ({
    id: doc._id,
    title: doc?.PerNameSortedTxt ?? '',
    text: doc?.PerDatingTxt ?? '',
    image: doc?.PerMultimediaRel?.[0]?.MulUrl ?? '',
  }));
};

export const mapDocumentToPerson = (doc: IPersonServer): IPerson => {
  return {
    id: doc._id,
    name: doc.PerNameTxt ?? '',
    nameSorted: doc.PerNameSortedTxt ?? '',
    dating: doc.PerDatingTxt ?? '',
    image: doc?.PerMultimediaRel?.[0]?.MulUrl ?? null,
    place: doc.PerBirthPlaceCity ?? '',
    country: doc.PerBirthPlaceCountry ?? '',
    type: doc.PerTypeVoc,
    text: doc.PerMarkdown ?? '',
    relatedObjects:
      doc.PerObjectRel?.map((obj: IPersonObjectRelation) => ({
        id: obj.ObjId,
        title: obj.ObjObjectTitleTxt ?? '',
        text: obj.ObjDesigner ?? '',
        image: obj.ObjUrl ?? null,
      })) ?? [],
  };
};
