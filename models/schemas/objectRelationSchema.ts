import { Schema } from 'mongoose';

export const objectRelationSchema = new Schema({
  ObjId: Number, // Id
  ObjObjectTitleTxt: String, // Name
  ObjObjectTitleSubTxt: String, // Type
  ObjDateGrp_DateFromTxt: String, // Dating
  ObjDesigner: String,
  ObjUrl: String,
});
