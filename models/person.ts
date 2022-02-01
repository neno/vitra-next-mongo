import mongoose, { Schema } from 'mongoose';
import { objectRelationSchema } from './schemas';
import { IPersonServer } from '../types';

const MODEL_NAME = 'Person';
const DBCollection = 'persons';

const schema = new Schema<IPersonServer>({
  _id: Number,

  PerNameTxt: String,
  PerDatingTxt: String,
  PerNameSortedTxt: String,
  PerTypeVoc: String,
  PerNationalityTxt: String,
  PerMarkdown: String,
  PerBirthPlaceCity: String,
  PerBirthPlaceCountry: String,
  PerDisplay: String,
  PerFullText: String,
  PerMultimediaRel: [
    {
      MulUrl: String,
      MulUrls: [
        {
          me: String,
        },
      ],
    },
  ],
  PerObjectRel: [objectRelationSchema],
});

export default mongoose.models[MODEL_NAME] ||
  mongoose.model(MODEL_NAME, schema, DBCollection);
