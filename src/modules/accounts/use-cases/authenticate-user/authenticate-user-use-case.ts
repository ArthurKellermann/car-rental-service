import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../repositories/user-repository';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { UserTokensRepository } from '../../repositories/users-tokens-repository';
import auth from '../../../../config/auth';
import { DateProvider } from '../../../../shared/container/providers/date-provider/date-provider';

interface AuthenticateUserRequest {
  email: string;
  password: string;
}

interface AuthenticateUserResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('PrismaUsersRepository') private usersRepository: UserRepository,
    @inject('PrismaUserTokensRepository')
    private userTokensRepository: UserTokensRepository,
    @inject('DateProvider') private dateProvider: DateProvider,
  ) {}
  async execute({
    email,
    password,
  }: AuthenticateUserRequest): Promise<AuthenticateUserResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError({
        statusCode: 400,
        message: 'Email or password incorrect',
      });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError({
        statusCode: 400,
        message: 'Email or password incorrect',
      });
    }

    const token = sign({}, auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token,
    });

    const refresh_token_expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    );

    await this.userTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenReturn: AuthenticateUserResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      refresh_token,
    };

    return tokenReturn;
  }
}
