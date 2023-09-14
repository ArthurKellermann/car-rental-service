import 'reflect-metadata';
import { CreateUserDTO } from '../../repositories/implementations/dtos/create-user-dto';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { CreateUserUseCase } from '../create-user/create-user-use-case';
import { AuthenticateUserUseCase } from './authenticate-user-user-case';
import { AppError } from '../../../../errors/app-error';

let authenticateUser: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUser = new AuthenticateUserUseCase(inMemoryUsersRepository);
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

  it('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUser.execute({
        email: 'false@test.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should no be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: CreateUserDTO = {
        driver_license: '99999',
        email: 'user@user.com',
        password: '1234',
        name: 'User test',
        username: 'usernametesterror',
      };

      await createUserUseCase.execute(user);

      await authenticateUser.execute({
        email: user.email,
        password: 'incorrectPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
