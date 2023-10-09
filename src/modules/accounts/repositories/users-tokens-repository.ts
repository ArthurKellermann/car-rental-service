import { CreateUserTokensDto } from '../dtos/create-user-tokens-dto';
import { UserTokens } from '../entities/user-tokens';

export interface UserTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: CreateUserTokensDto): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;
}
