/* eslint-disable func-names */
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';

import { Consultant } from '../constants';
import { IConsultant } from '../types/consultant';

const ConsultantSchema: Schema = new Schema(
  {
    [Consultant.name]: {
      type: String,
      required: true,
      trim: true,
    },

    [Consultant.email]: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    [Consultant.password]: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

ConsultantSchema.pre<IConsultant>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return next();
});

export const passwordMatch = async (
  enterPassword: string,
  storedPassword: string
): Promise<boolean> => {
  const isEqual = await bcrypt.compare(enterPassword, storedPassword);
  return isEqual;
};

export default model<IConsultant>('Consultant', ConsultantSchema);
