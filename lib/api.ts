import { dbConnect } from 'middleware/db';
import Object from 'models/object';
import { mapObjectDocumentsToListItems } from 'helper';
import { IListItem } from './../types/clientTypes';

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
  const objects = await Object.find().exec();
  return mapObjectDocumentsToListItems(objects);
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
    .project({
      _id: 1,
      ObjObjectTitleTxt: 1,
      ObjObjectTitleSubTxt: 1,
      ObjDateGrp_DateFromTxt: 1,
      ObjDesigner: 1,
      ObjMultimediaRel: 1,
    })
    .limit(10);

  return mapObjectDocumentsToListItems(objects);
}
