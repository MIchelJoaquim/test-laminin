import { model, Schema } from 'mongoose';

import { IConsultant } from '../types/consultant';

const consultantSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model<IConsultant>('Consultant', consultantSchema);
