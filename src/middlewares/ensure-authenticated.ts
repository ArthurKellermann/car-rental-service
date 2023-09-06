import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { prismaUsersRepository } from '../database';

interface Payload {
  sub: string;
}
export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Token missing');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '9b913e7f1f9e37ddaae984018e3dfc54',
    ) as Payload;

    const user = prismaUsersRepository.findById(user_id);

    if (!user) {
      throw new Error('User does not exists');
    }

    next();
  } catch {
    throw new Error('Invalid token');
  }
}
