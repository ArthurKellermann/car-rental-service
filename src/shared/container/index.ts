import 'reflect-metadata';
import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/categories-repository';
import { PrismaCategoriesRepository } from '../../database/prisma/repositories/prisma-categories-repository';
import { SpecificationRepository } from '../../modules/cars/repositories/implementations/specifications-repository';
import { PrismaSpecificationsRepository } from '../../database/prisma/repositories/prisma-specifications-repository';
import { prismaClient } from '../../database/prisma/prisma-client';
import { UserRepository } from '../../modules/accounts/repositories/implementations/user-repository';
import { PrismaUsersRepository } from '../../database/prisma/repositories/prisma-users-repository';

container.registerInstance('PrismaClient', prismaClient);

container.registerSingleton<CategoriesRepository>(
  'PrismaCategoriesRepository',
  PrismaCategoriesRepository,
);

container.registerSingleton<SpecificationRepository>(
  'PrismaSpecificationsRepository',
  PrismaSpecificationsRepository,
);

container.registerSingleton<UserRepository>(
  'PrismaUsersRepository',
  PrismaUsersRepository,
);
