import { inject, injectable } from 'tsyringe';
import { CreateUserTokensDto } from '../../dtos/create-user-tokens-dto';
import { UserTokens } from '../../entities/user-tokens';
import { UserTokensRepository } from '../users-tokens-repository';
import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaUserTokensRepository implements UserTokensRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: CreateUserTokensDto): Promise<UserTokens> {
    const userToken = await this.prisma.userToken.create({
      data: {
        expires_date,
        refresh_token,
        user_id,
      },
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const userTokens = await this.prisma.userToken.findFirst({
      where: {
        user_id,
        refresh_token,
      },
    });

    return userTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.prisma.userToken.delete({
      where: {
        id,
      },
    });
  }
}
