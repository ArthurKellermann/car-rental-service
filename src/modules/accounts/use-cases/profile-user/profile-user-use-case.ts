import { inject, injectable } from 'tsyringe';
import { UserRepository } from '../../repositories/user-repository';

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject('PrismaUsersRepository') private userRepository: UserRepository,
  ) {}
  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    return user;
  }
}
