import 'reflect-metadata';
import { CreateUserDTO } from '../../dtos/create-user-dto';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { CreateUserUseCase } from '../create-user/create-user-use-case';
import { AuthenticateUserUseCase } from './authenticate-user-use-case';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { InMemoryUsersTokensRepository } from '../../repositories/in-memory/in-memory-users-tokens-repository';
import { DayjsDateProvider } from '../../../../shared/container/providers/date-provider/implementations/dayjs-date-provider';

let authenticateUser: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
let dateProvider: DayjsDateProvider;

describe('Authenticate user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    authenticateUser = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to authenticate an user', async () => {
    const user: CreateUserDTO = {
      driver_license: '123123',
      email: 'user@test.com',
      password: '1234',
      name: 'User test',
      username: 'usernametest',
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUser.execute({
      email: 'user@test.com',
      password: '1234',
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'false@test.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: CreateUserDTO = {
        email: 'user@user.com',
        password: '1234',
        name: 'User test',
        username: 'usernametesterror',
        driver_license: '99999',
      };

      await createUserUseCase.execute(user);

      await authenticateUser.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
