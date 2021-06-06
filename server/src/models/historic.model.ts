import { model, Schema } from 'mongoose';

import { Historic } from '../constants';

const historicSchema: Schema = new Schema({
  [Historic.market]: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  [Historic.productName]: {
    type: String,
    required: true,
  },
  [Historic.productPrice]: {
    type: Number,
    required: true,
  },
});

export default model('Historic', historicSchema);
