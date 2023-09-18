import { injectable, inject } from 'tsyringe';
import { deleteFile } from '../../../../utils/file';
import { UserRepository } from '../../repositories/user-repository';

interface UdpateUserAvatarUseCaseRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UdpateUserAvatarUseCase {
  constructor(
    @inject('PrismaUsersRepository') private userRepository: UserRepository,
  ) {}

  async execute({
    user_id,
    avatar_file,
  }: UdpateUserAvatarUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    user.avatar = avatar_file;

    await this.userRepository.create(user);

    return;
  }
}
