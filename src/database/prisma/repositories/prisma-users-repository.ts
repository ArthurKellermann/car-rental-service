import { PrismaClient } from '@prisma/client';
import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../../modules/accounts/repositories/implementations/user-repository';
import { CreateUserDTO } from '../../../modules/accounts/repositories/implementations/dtos/create-user-dto';

@injectable()
export class PrismaUsersRepository implements UserRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create({
    name,
    username,
    email,
    password,
    driver_license,
  }: CreateUserDTO): Promise<void> {
    await this.prisma.user.create({
      data: {
        name,
        username,
        email,
        password,
        driver_license,
      },
    });

    return;
  }
}
