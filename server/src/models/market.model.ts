import { model, Schema } from 'mongoose';

import { IMarket } from '../types/market';

const marketSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model<IMarket>('Market', marketSchema);
