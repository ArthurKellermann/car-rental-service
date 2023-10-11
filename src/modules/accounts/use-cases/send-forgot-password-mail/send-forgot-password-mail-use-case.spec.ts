import 'reflect-metadata';
import { DayjsDateProvider } from '../../../../shared/container/providers/date-provider/implementations/dayjs-date-provider';
import { InMemoryMailProvider } from '../../../../shared/container/providers/mail-provider/in-memory/in-memory-mail-provider';
import { InMemoryUsersRepository } from '../../repositories/in-memory/in-memory-users-repository';
import { InMemoryUsersTokensRepository } from '../../repositories/in-memory/in-memory-users-tokens-repository';
import { SendForgotPasswordMailUseCase } from './send-forgot-password-mail-use-case';
import { AppError } from '../../../../shared/infra/errors/app-error';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryUsersTokensRepository: InMemoryUsersTokensRepository;
let dateProvider: DayjsDateProvider;
let mailProvider: InMemoryMailProvider;

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryUsersTokensRepository = new InMemoryUsersTokensRepository();
    dateProvider = new DayjsDateProvider();
    mailProvider = new InMemoryMailProvider();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUsersTokensRepository,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await inMemoryUsersRepository.create({
      driver_license: '11234',
      email: 'johndoe@mail.com',
      name: 'John Doe',
      username: 'johndoe123',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('johndoe@mail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to send an email if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('john@mail.com'),
    ).rejects.toEqual(
      new AppError({
        message: 'User does not exists',
      }),
    );
  });

  it('should be able to create an users token', async () => {
    const generateTokenMail = jest.spyOn(
      inMemoryUsersTokensRepository,
      'create',
    );

    await inMemoryUsersRepository.create({
      driver_license: '11234',
      email: 'arthur@mail.com',
      name: 'Arthur Perkins',
      username: 'arthurperkins123',
      password: '1234',
    });

    await sendForgotPasswordMailUseCase.execute('arthur@mail.com');

    expect(generateTokenMail).toBeCalled();
  });
});
