import 'reflect-metadata';
import { container } from 'tsyringe';

import './providers/';
import { CategoriesRepository } from '../../modules/cars/repositories/categories-repository';
import { PrismaCategoriesRepository } from '../../modules/cars/repositories/prisma/prisma-categories-repository';
import { SpecificationsRepository } from '../../modules/cars/repositories/specifications-repository';
import { PrismaSpecificationsRepository } from '../../modules/cars/repositories/prisma/prisma-specifications-repository';
import { prismaClient } from '../infra/database/prisma/prisma-client';
import { UserRepository } from '../../modules/accounts/repositories/user-repository';
import { PrismaUsersRepository } from '../../modules/accounts/repositories/prisma/prisma-users-repository';
import { CarsRepository } from '../../modules/cars/repositories/cars-repository';
import { PrismaCarsRepository } from '../../modules/cars/repositories/prisma/prisma-cars-repository';
import { CarsImagesRepository } from '../../modules/cars/repositories/cars-images-repository';
import { PrismaCarsImagesRepository } from '../../modules/cars/repositories/prisma/prisma-cars-images-repository';
import { RentalsRepository } from '../../modules/rentals/repositories/rental-repository';
import { PrismaRentalsRepository } from '../../modules/rentals/repositories/prisma/prisma-rentals-repository';

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

container.registerSingleton<RentalsRepository>(
  'PrismaRentalsRepository',
  PrismaRentalsRepository,
);
