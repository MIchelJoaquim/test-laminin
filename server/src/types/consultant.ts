import { Document } from 'mongoose';

export interface IConsultant extends Document {
  name: string;
  email: string;
}
