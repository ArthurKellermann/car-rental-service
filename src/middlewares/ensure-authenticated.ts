import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { prismaUsersRepository } from '../database';
import { AppError } from '../errors/app-error';

interface Payload {
  sub: string;
}
export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError({
      statusCode: 401,
      message: 'Token missing',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '9b913e7f1f9e37ddaae984018e3dfc54',
    ) as Payload;

    const user = await prismaUsersRepository.findById(user_id);

    if (!user) {
      throw new AppError({
        statusCode: 401,
        message: 'User does not exists',
      });
    }

    req.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError({
      statusCode: 401,
      message: 'Invalid token',
    });
  }
}
