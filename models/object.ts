import mongoose, { Schema } from 'mongoose';
import { objectRelationSchema, personRelationSchema } from './schemas';
import { IObjectServer } from '../types';

const MODEL_NAME = 'Object';
const DBCollection = 'objects';

const schema = new Schema<IObjectServer>({
  _id: Number,
  ObjObjectTitleTxt: String,
  ObjDateGrp_DateFromTxt: String,
  ObjDesigner: String,
  ObjHighlight: String,
  ObjMultimediaRel: [
    {
      MulUrl: String,
    },
  ],
  ObjCategoryVoc: String,
  ObjDateTxt: String,
  ObjMaterialTechniqueTxt: String,
  ObjDimension: String,
  ObjMarkdown: String,
  ObjDateGrp_Notes2Clb: String,
  ObjObjectNumberGrp_Part1Txt: String,
  ObjPersonRel: [personRelationSchema],
  ObjObjectRel: [objectRelationSchema],
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, DBCollection);
