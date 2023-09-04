import { PrismaCategoriesRepository } from './prisma/repositories/prisma-categories-repository';
import { PrismaSpecificationsRepository } from './prisma/repositories/prisma-specifications-repository';
import { prismaClient } from './prisma/prisma-client';

const prismaCategoriesRepository = new PrismaCategoriesRepository(prismaClient);
const prismaSpecificationsRepository = new PrismaSpecificationsRepository(
  prismaClient,
);

export { prismaCategoriesRepository, prismaSpecificationsRepository };
