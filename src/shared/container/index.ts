import 'reflect-metadata';
import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/cars/repositories/categories-repository';
import { PrismaCategoriesRepository } from '../../database/prisma/repositories/prisma-categories-repository';
import { SpecificationsRepository } from '../../modules/cars/repositories/specifications-repository';
import { PrismaSpecificationsRepository } from '../../database/prisma/repositories/prisma-specifications-repository';
import { prismaClient } from '../../database/prisma/prisma-client';
import { UserRepository } from '../../modules/accounts/repositories/user-repository';
import { PrismaUsersRepository } from '../../database/prisma/repositories/prisma-users-repository';
import { CarsRepository } from '../../modules/cars/repositories/cars-repository';
import { PrismaCarsRepository } from '../../database/prisma/repositories/prisma-cars-repository';
import { CarsImagesRepository } from '../../modules/cars/repositories/cars-images-repository';
import { PrismaCarsImagesRepository } from '../../database/prisma/repositories/prisma-cars-images-repository';

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

container.registerSingleton<CarsRepository>(
  'PrismaCarsRepository',
  PrismaCarsRepository,
);

container.registerSingleton<CarsImagesRepository>(
  'PrismaCarsImagesRepository',
  PrismaCarsImagesRepository,
);
