import { hash } from 'bcryptjs';
import { prismaClient } from '../prisma/prisma-client';
import { v4 as randomUUID } from 'uuid';

export async function createAdmin() {
  const id = randomUUID();
  const password = await hash('admin', 8);
  try {
    await prismaClient.user.create({
      data: {
        id: id,
        name: 'Admin',
        username: 'admin',
        email: 'admin@rentx.com.br',
        password: password,
        isAdmin: true,
        created_at: new Date(),
        driver_license: 'xxxxxx',
      },
    });
  } finally {
    await prismaClient.$disconnect();
  }
}
