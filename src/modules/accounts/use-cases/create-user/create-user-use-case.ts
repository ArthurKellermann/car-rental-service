import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../repositories/implementations/user-repository';
import { CreateUserDTO } from '../../repositories/implementations/dtos/create-user-dto';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('PrismaUsersRepository') private userRepository: UserRepository,
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driver_license,
  }: CreateUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    });

    return;
  }
}
