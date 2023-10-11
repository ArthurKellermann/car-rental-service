import { inject, injectable } from 'tsyringe';
import { v4 as randomUUID } from 'uuid';
import { resolve } from 'path';
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
    @inject('EtherealMailProvider') private mailProvider: MailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgot-password.hbs',
    );

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

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    };

    await this.mailProvider.sendMail(
      email,
      'Password Recuperation',
      variables,
      templatePath,
    );
  }
}
