import { randomInt } from 'crypto';
import { Router } from 'express';

import consultantModel from '../models/consultant.model';
import historicModel from '../models/historic.model';
import marketModel from '../models/market.model';

const router: Router = Router();

router.get('/', async (_req, res) => {
  // for example propose only
  const nemail = randomInt(100);
  consultantModel.create({ name: 'Theodora', email: `michel${nemail}joaquim@gmail.com` });
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
