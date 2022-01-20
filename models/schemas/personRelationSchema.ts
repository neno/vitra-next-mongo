import { Schema } from 'mongoose';

export const personRelationSchema = new Schema({
  PerId: Number, // Id
  PerNameTxt: String, // Name
  PerTypeVoc: String, // Type
  PerDatingTxt: String, // Dating
  PerBirthPlaceCity: String,
  PerBirthPlaceCountry: String,
  PerUrl: String, // Image
});
