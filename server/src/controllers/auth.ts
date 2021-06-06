/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Consultant } from '../constants';
import consultantModel from '../models/consultant.model';

const passwordMatch = async (enterPassword: string, storedPassword: string): Promise<boolean> => {
  const isEqual = await bcrypt.compare(enterPassword, storedPassword);
  return isEqual;
};

const generateAccessToken = (consultant: { name: string; email: string }) =>
  `${process.env.TOKEN_TYPE}${jwt.sign(consultant, process.env.JWT_SECRET || 'error', {
    expiresIn: '1800s',
  })}`;

const validateToken = (token: string, secret: string) => jwt.verify(token, secret);

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await consultantModel.findOne({ email });

  if (user) {
    const isPasswordCorrect = await passwordMatch(password, user.password);

    if (isPasswordCorrect) {
      const userToSend = {
        // eslint-disable-next-line no-underscore-dangle
        id: user._id,
        [Consultant.name]: user.name,
        [Consultant.email]: user.email,
      };
      const accessToken = generateAccessToken({
        [Consultant.name]: user.name,
        [Consultant.email]: email,
      });
      return res.cookie('token', accessToken, { httpOnly: true }).json({
        user: userToSend,
        accessToken,
      });
    }
  }

  return res.json({ msg: 'Username or password incorrect' });
};

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const consultant = await consultantModel.create({
      [Consultant.name]: name,
      [Consultant.email]: email,
      [Consultant.password]: password,
    });

    const accessToken = generateAccessToken({
      [Consultant.name]: name,
      [Consultant.email]: email,
    });
    return res.cookie('token', accessToken, { httpOnly: true }).json({
      user: { _id: consultant._id, name: consultant.name, email: consultant.email },
      accessToken,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.json({
        msg: `Lamentamos, já foi registrado o e-mail: ${error.keyValue.email}`,
      });
    }

    return res.json({ msg: 'Lamentamos, infelizmente ocorreu um erro', error: error.message });
  }
};

export const tokenVerify = async (req: Request, res: Response) => {
  const { token } = req.cookies;
  try {
    const decoded = await validateToken(token, process.env.JWT_SECRET || 'error');
    return res.status(200).json({ user: decoded });
  } catch (error) {
    return res.json({ msg: 'Lamentamos, infelizmente ocorreu um erro', error: error.message });
  }
};
