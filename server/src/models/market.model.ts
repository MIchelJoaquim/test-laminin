import { model, Schema } from 'mongoose';

import { Market } from '../constants';
import { IMarket } from '../types/market';

const marketSchema: Schema = new Schema(
  {
    [Market.name]: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default model<IMarket>('Market', marketSchema);
