import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line consistent-return
const validateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (token[0] !== process.env.TOKEN_TYPE)
      return res.status(401).json({ msg: 'Unauthorized, invalid token' });

    jwt.verify(token, process.env.JWT_SECRET || 'error', (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ msg: 'Unauthorized, resource blocked' });
      }

      req.user = user;
      return next();
    });
  } else {
    return res.status(401).json({ msg: 'Unauthorized, invalid token' });
  }
};

export default validateJWT;
