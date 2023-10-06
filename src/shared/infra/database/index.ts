import { PrismaCategoriesRepository } from '../../../modules/cars/repositories/prisma/prisma-categories-repository';
import { PrismaSpecificationsRepository } from '../../../modules/cars/repositories/prisma/prisma-specifications-repository';
import { prismaClient } from './prisma/prisma-client';
import { PrismaUsersRepository } from '../../../modules/accounts/repositories/prisma/prisma-users-repository';
import { PrismaCarsRepository } from '../../../modules/cars/repositories/prisma/prisma-cars-repository';

const prismaCategoriesRepository = new PrismaCategoriesRepository(prismaClient);
const prismaSpecificationsRepository = new PrismaSpecificationsRepository(
  prismaClient,
);
const prismaUsersRepository = new PrismaUsersRepository(prismaClient);
const prismaCarsRepository = new PrismaCarsRepository(prismaClient);

export {
  prismaCategoriesRepository,
  prismaSpecificationsRepository,
  prismaUsersRepository,
  prismaCarsRepository,
};
