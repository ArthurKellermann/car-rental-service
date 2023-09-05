import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../repositories/implementations/user-repository';
import { CreateUserDTO } from '../../repositories/implementations/dtos/create-user-dto';
import { hash } from 'bcryptjs';

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
    const userAlradyExists = await this.userRepository.findByEmail(email);

    if (userAlradyExists) {
      throw new Error('User already exists');
    }
    const passwordHash = await hash(password, 8);

    await this.userRepository.create({
      name,
      username,
      email,
      password: passwordHash,
      driver_license,
    });

    return;
  }
}
