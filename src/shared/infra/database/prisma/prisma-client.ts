import { PrismaClient } from '@prisma/client';

// const isTestEnv = process.env.NODE_ENV === 'test';
const prismaClient = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

export { prismaClient };
