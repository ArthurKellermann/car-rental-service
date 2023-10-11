import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../user-repository';
import { CreateUserDTO } from '../../dtos/create-user-dto';
import { User } from '../../entities/user';

@injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}
  async create({
    name,
    username,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: CreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
        avatar,
        id,
        driver_license,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    return user;
  }
  async updateUserPassword(id: string, password: string) {
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return user;
  }
}
