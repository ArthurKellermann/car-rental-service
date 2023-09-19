import { NextFunction, Request, Response } from 'express';
import { prismaUsersRepository } from '../../../../database';
import { AppError } from '../../errors/app-error';

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const id = req.user.id;

  const user = await prismaUsersRepository.findById(id);

  if (!user.isAdmin) {
    throw new AppError({
      message: 'User is not an admin',
    });
  }

  return next();
}
