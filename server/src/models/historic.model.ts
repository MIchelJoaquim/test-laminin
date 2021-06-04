import { model, Schema } from 'mongoose';

const historicSchema: Schema = new Schema({
  market: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
});

export default model('Historic', historicSchema);
