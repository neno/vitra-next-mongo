import { dbConnect } from '../middleware/db';
import Object from '../models/object';
import Person from '../models/person';
import {
  mapDesignerDocumentsToListItems,
  mapDocumentToObject,
  mapDocumentToPerson,
  mapManufacturerDocumentsToListItems,
  mapObjectDocumentsToListItems,
} from '../helper';
import { IListItem, IObject, IPerson, PersonType } from './../types';

const objectItemProjection = {
  _id: 1,
  ObjObjectTitleTxt: 1,
  ObjDateGrp_DateFromTxt: 1,
  ObjDesigner: 1,
  ObjMultimediaRel: 1,
};

const objectProjection = {
  ...objectItemProjection,
  ObjCategoryVoc: 1,
  ObjDateTxt: 1,
  ObjMaterialTechniqueTxt: 1,
  ObjDimension: 1,
  ObjMarkdown: 1,
  ObjDateGrp_Notes2Clb: 1,
  ObjObjectNumberGrp_Part1Txt: 1,
  ObjPersonRel: 1,
  ObjObjectRel: 1,
};

const designerItemProjection = {
  _id: 1,
  PerNameSortedTxt: 1,
  PerDatingTxt: 1,
  PerMultimediaRel: 1,
};

const manufacturerItemProjection = {
  _id: 1,
  PerNameTxt: 1,
  PerBirthPlaceCity: 1,
  PerNationalityTxt: 1,
  PerMultimediaRel: 1,
};

//   id: doc._id,
//   name: doc.PerNameTxt ?? '',
//   nameSorted: doc.PerNameSortedTxt ?? '',
//   dating: doc.PerDatingTxt ?? '',
//   image: doc?.PerMultimediaRel?.[0]?.MulUrl ?? null,
//   place: doc.PerBirthPlaceCity ?? '',
//   country: doc.PerBirthPlaceCountry ?? '',
//   type: doc.PerTypeVoc,
//   text: doc.PerMarkdown ?? '',
//   relatedObjects:
//     doc.PerObjectRel?.map((obj: IPersonObjectRelation) => ({
//       id: obj.ObjId,
//       title: obj.ObjObjectTitleTxt ?? '',
//       text: obj.ObjDesigner ?? '',
//       image: obj.ObjUrl ?? null,
//     })) ?? [],
// };

const personProjection = {
  _id: 1,
  PerTypeVoc: 1,
  PerNameTxt: 1,
  PerNameSortedTxt: 1,
  PerDatingTxt: 1,
  PerBirthPlaceCity: 1,
  PerNationalityTxt: 1,
  PerMultimediaRel: 1,
  PerMarkdown: 1,
  PerObjectRel: 1,
};

export async function fetchObjectItems(): Promise<IListItem[]> {
  await dbConnect();
  const objects = await Object.find({}, objectItemProjection)
    .sort({ ObjObjectTitleTxt: 1, ObjDateGrp_DateFromTxt: 1, ObjDesigner: 1 })
    .exec();
  return mapObjectDocumentsToListItems(objects);
}

export async function fetchObject(_id: string): Promise<IObject> {
  await dbConnect();
  const object = await Object.findOne({ _id }, objectProjection).exec();
  return mapDocumentToObject(object);
}

export async function fetchAllObjectIds(): Promise<{ _id: string }[]> {
  await dbConnect();
  const objects = await Object.find({}, { _id: 1 }).exec();

  return objects;
}

export async function autoCompleteObjects(q: string): Promise<IListItem[]> {
  await dbConnect();
  const objects = await Object.aggregate()
    .search({
      index: 'autoCompleteObjects',
      autocomplete: {
        query: q,
        path: 'ObjFullText',
      },
    })
    .project(objectItemProjection)
    .sort({ ObjObjectTitleTxt: 1, ObjDateGrp_DateFromTxt: 1, ObjDesigner: 1 })
    .limit(10);

  return mapObjectDocumentsToListItems(objects);
}

export async function fetchDesignerItems(): Promise<IListItem[]> {
  await dbConnect();
  const designers = await Person.find(
    { PerTypeVoc: PersonType.Designer },
    designerItemProjection
  )
    .sort({ PerNameSortedTxt: 1 })
    .exec();
  return mapDesignerDocumentsToListItems(designers);
}

export async function fetchManufacturerItems(): Promise<IListItem[]> {
  await dbConnect();
  const manufacturers = await Person.find(
    { PerTypeVoc: PersonType.Manufacturer },
    manufacturerItemProjection
  )
    .sort({ PerNameSortedTxt: 1 })
    .exec();
  return mapManufacturerDocumentsToListItems(manufacturers);
}

export async function fetchPerson(_id: string): Promise<any> {
  await dbConnect();
  const person = await Person.findOne({ _id }, personProjection).exec();

  return mapDocumentToPerson(person);
}

export async function autoCompleteDesigners(q: string): Promise<IListItem[]> {
  await dbConnect();
  const designers = await Person.aggregate()
    .search({
      index: 'autoCompletePersons',
      autocomplete: {
        query: q,
        path: 'PerFullText',
      },
    })
    .match({ PerTypeVoc: PersonType.Designer })
    .sort({ PerNameSortedTxt: 1 })
    .project(designerItemProjection)
    .limit(10);

  return mapDesignerDocumentsToListItems(designers);
}

export async function autoCompleteManufacturers(
  q: string
): Promise<IListItem[]> {
  await dbConnect();
  const manufacturers = await Person.aggregate()
    .search({
      index: 'autoCompletePersons',
      autocomplete: {
        query: q,
        path: 'PerFullText',
      },
    })
    .match({ PerTypeVoc: PersonType.Manufacturer })
    .sort({ PerNameSortedTxt: 1 })
    .project(manufacturerItemProjection)
    .limit(10);

  return mapManufacturerDocumentsToListItems(manufacturers);
}

export async function fetchAllDesignerIds(): Promise<{ _id: string }[]> {
  await dbConnect();
  const designerIds = await Person.find(
    { PerVocType: PersonType.Designer },
    { _id: 1 }
  ).exec();

  return designerIds;
}

export async function fetchAllManufacturerIds(): Promise<{ _id: string }[]> {
  await dbConnect();
  const manufacturerIds = await Person.find(
    { PerVocType: PersonType.Manufacturer },
    { _id: 1 }
  ).exec();

  return manufacturerIds;
}
