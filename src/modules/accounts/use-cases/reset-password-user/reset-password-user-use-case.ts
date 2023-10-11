import { inject, injectable } from 'tsyringe';
import { UserTokensRepository } from '../../repositories/users-tokens-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { DateProvider } from '../../../../shared/container/providers/date-provider/date-provider';
import { UserRepository } from '../../repositories/user-repository';
import { hash } from 'bcryptjs';

interface ResetPasswordUserRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordUserUseCase {
  constructor(
    @inject('PrismaUserTokensRepository')
    private userTokensRepository: UserTokensRepository,
    @inject('DateProvider') private dateProvider: DateProvider,
    @inject('PrismaUsersRepository') private userRepository: UserRepository,
  ) {}
  async execute({ password, token }: ResetPasswordUserRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError({
        message: 'Invalid token',
      });
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError({
        message: 'Token expired',
      });
    }

    const user = await this.userRepository.findById(userToken.user_id);

    user.password = await hash(password, 8);

    await this.userRepository.updateUserPassword(user.id, user.password);

    await this.userTokensRepository.deleteById(userToken.id);
  }
}
