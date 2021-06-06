import { Response } from 'express';

export const removeExtraAspas = (text: string): string => text.replace('"', '').replace('"', '');

export const errorResponse = (res: Response, error: string) =>
  res.status(500).json({ msg: 'Lamentamos, infelizmente ocorreu um erro', error });
