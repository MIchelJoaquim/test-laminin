import { Document } from 'mongoose';

import { Consultant } from '../constants';

export interface IConsultant extends Document {
  [Consultant.name]: string;
  [Consultant.email]: string;
  [Consultant.password]: string;
}
