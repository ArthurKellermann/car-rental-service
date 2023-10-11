import { CreateUserTokensDto } from '../../dtos/create-user-tokens-dto';
import { UserTokens } from '../../entities/user-tokens';
import { UserTokensRepository } from '../users-tokens-repository';

export class InMemoryUsersTokensRepository implements UserTokensRepository {
  private usersTokens: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id,
  }: CreateUserTokensDto): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token,
    );

    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const index = this.usersTokens.findIndex(
      (userToken) => userToken.id === id,
    );
    this.usersTokens.splice(index);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token,
    );

    return userToken;
  }
}
