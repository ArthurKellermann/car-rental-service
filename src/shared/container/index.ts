import 'reflect-metadata';
import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/cars/repositories/categories-repository';
import { PrismaCategoriesRepository } from '../../database/prisma/repositories/prisma-categories-repository';
import { SpecificationsRepository } from '../../modules/cars/repositories/specifications-repository';
import { PrismaSpecificationsRepository } from '../../database/prisma/repositories/prisma-specifications-repository';
import { prismaClient } from '../../database/prisma/prisma-client';
import { UserRepository } from '../../modules/accounts/repositories/user-repository';
import { PrismaUsersRepository } from '../../database/prisma/repositories/prisma-users-repository';

container.registerInstance('PrismaClient', prismaClient);

container.registerSingleton<CategoriesRepository>(
  'PrismaCategoriesRepository',
  PrismaCategoriesRepository,
);

container.registerSingleton<SpecificationsRepository>(
  'PrismaSpecificationsRepository',
  PrismaSpecificationsRepository,
);

container.registerSingleton<UserRepository>(
  'PrismaUsersRepository',
  PrismaUsersRepository,
);
