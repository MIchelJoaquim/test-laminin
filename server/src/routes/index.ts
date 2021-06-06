import { randomInt } from 'crypto';
import { Request, Response, Router } from 'express';

import { login, signup, tokenVerify } from '../controllers/auth';
import { createMarket, readAllMarket } from '../controllers/market';
import consultantModel from '../models/consultant.model';
import historicModel from '../models/historic.model';
import marketModel from '../models/market.model';

const router: Router = Router();

router.post('/auth/login', login);

router.get('/auth/verify', tokenVerify);

router.post('/auth/register', signup);

router.post('/market', createMarket);

router.get('/market', readAllMarket);

router.get('/', async (_req: Request, res: Response) => {
  // for example propose only
  const nemail = randomInt(100);
  consultantModel.create({
    name: 'Theodora',
    email: `michel01joaquim@gmail.com`,
    password: '1234',
  });
  const market = await marketModel.create({ name: `asa branca ${nemail}` });
  historicModel.create({
    // eslint-disable-next-line no-underscore-dangle
    market: market._id,
    productName: 'rice',
    productPrice: 10000,
  });
  try {
    const historic = await historicModel.aggregate([
      { $lookup: { from: 'markets', localField: 'market', foreignField: '_id', as: 'market' } },
      {
        $unwind: '$market', // this to convert the array of one object to be an object
      },
    ]);
    res.status(200).json({ historic });
  } catch (error) {
    console.log(error);
    res.send('FAIL!');
  }
});

export default router;
