import { dbConnect } from '../middleware/db';
import Object from '../models/object';
import Person from '../models/person';
import {
  mapDesignerDocumentsToListItems,
  mapDocumentToObject,
  mapDocumentToPerson,
  mapObjectDocumentsToListItems,
} from '../helper';
import { IListItem, IObject, IPerson } from './../types/clientTypes';
import { PersonType } from 'types';

const objectItemProjection = {
  _id: 1,
  ObjObjectTitleTxt: 1,
  ObjObjectTitleSubTxt: 1,
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
  PerNameTxt: 1,
  PerNameSortedTxt: 1,
  PerDatingTxt: 1,
  PerMultimediaRel: 1,
};

export async function fetchObjectItems(): Promise<IListItem[]> {
  await dbConnect();
  const objects = await Object.find({}, objectItemProjection).exec();
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
  console.log(objects);

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
    .limit(10);

  return mapObjectDocumentsToListItems(objects);
}

export async function fetchDesignerItems(): Promise<IListItem[]> {
  await dbConnect();
  const designers = await Object.find(
    { PerTypeVoc: PersonType.Designer },
    objectItemProjection
  ).exec();
  return mapDesignerDocumentsToListItems(designers);
}

export async function fetchPerson(_id: string): Promise<IPerson> {
  await dbConnect();
  const person = await Object.findOne({ _id }, objectProjection).exec();
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
    .project(objectItemProjection)
    .limit(10);

  return mapObjectDocumentsToListItems(designers);
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
    .project(objectItemProjection)
    .limit(10);

  return mapObjectDocumentsToListItems(manufacturers);
}
