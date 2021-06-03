import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Express } from 'express';

import mongoBdConnect from './mongoose/index';
import routes from './routes';

dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(routes);

mongoBdConnect(process.env.MONGO_URI || 'error')
  // eslint-disable-next-line no-console
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch(error => {
    throw error;
  });
