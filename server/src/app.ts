import cookieParser from 'cookie-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express, { Express } from 'express';
import passport from 'passport';

import mongoBdConnect from './mongoose/index';
import routes from './routes';

dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', routes);

app.use(passport.initialize());
app.use(passport.session());

mongoBdConnect(process.env.MONGO_URI || 'error')
  // eslint-disable-next-line no-console
  .then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)))
  .catch(() => {
    console.log(
      'Lamentamos, não foi possível conectar ao bando de dados, por favor verifique a sua conexao a internet'
    );
  });
