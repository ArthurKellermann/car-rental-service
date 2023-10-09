import { verify, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import { UserTokensRepository } from '../../repositories/users-tokens-repository';
import auth from '../../../../config/auth';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { DateProvider } from '../../../../shared/container/providers/date-provider/date-provider';

interface Payload {
  sub: string;
  email: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('PrismaUserTokensRepository')
    private usersTokensRepository: UserTokensRepository,
    @inject('DateProvider') private dateProvider: DateProvider,
  ) {}

  async execute(token: string): Promise<string> {
    const { sub, email } = verify(token, auth.secret_refresh_token) as Payload;
    const user_id = sub;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      );

    if (!userToken) {
      throw new AppError({
        message: 'Refresh Token doest not exists',
      });
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const refresh_token = sign(email, auth.secret_refresh_token, {
      subject: user_id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    return refresh_token;
  }
}
