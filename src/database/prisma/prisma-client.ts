import { PrismaClient } from '@prisma/client';

const isTestEnv = process.env.NODE_ENV === 'test';
const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: isTestEnv ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
    },
  },
});

export { prismaClient };
