import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories-repository';
import { PrismaSpecificationsRepository } from './prisma/repositories/prisma-specifications-repository';
import { prismaClient } from './prisma/prisma-client';
import { PrismaUsersRepository } from './prisma/repositories/prisma-users-repository';
import { PrismaCarsRepository } from './prisma/repositories/prisma-cars-repository';

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
