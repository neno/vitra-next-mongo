import { dbConnect } from 'middleware/db';
import Object from 'models/object';
import { mapDocumentToObject, mapObjectDocumentsToListItems } from 'helper';
import { IListItem, IObject } from './../types/clientTypes';

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
