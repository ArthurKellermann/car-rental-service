import { inject, injectable } from 'tsyringe';
import { v4 as randomUUID } from 'uuid';
import { UserRepository } from '../../repositories/user-repository';
import { UserTokensRepository } from '../../repositories/users-tokens-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { DateProvider } from '../../../../shared/container/providers/date-provider/date-provider';
import { MailProvider } from '../../../../shared/container/providers/mail-provider/mail-provider';

@injectable()
export class SendForgotPasswordMailUseCase {
  constructor(
    @inject('PrismaUsersRepository') private usersRepository: UserRepository,
    @inject('PrismaUserTokensRepository')
    private usersTokensRepository: UserTokensRepository,
    @inject('DateProvider') private dateProvider: DateProvider,
    @inject('EtherealMailProvider') private maiLProvider: MailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError({
        message: 'User does not exists',
      });
    }

    const token = randomUUID();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    await this.maiLProvider.sendMail(
      email,
      'Password Recuperation',
      `Link: ${token}`,
    );
  }
}
