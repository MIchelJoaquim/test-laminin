import { Document } from 'mongoose';

export interface IHistoric extends Document {
  market: string;
  productName: string;
  productPrice: Number;
}
