import { injectable, inject } from 'tsyringe';
import { UserRepository } from '../../repositories/user-repository';
import { StorageProvider } from '../../../../shared/container/providers/storage-provider/storage-provider';

interface UpdateUserAvatarUseCaseRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
export class UpdateUserAvatarUseCase {
  constructor(
    @inject('PrismaUsersRepository') private userRepository: UserRepository,
    @inject('StorageProvider') private storageProvider: StorageProvider,
  ) {}

  async execute({
    user_id,
    avatar_file,
  }: UpdateUserAvatarUseCaseRequest): Promise<void> {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar);
    }

    await this.storageProvider.save(avatar_file);

    user.avatar = avatar_file;

    await this.userRepository.updateUserAvatar(user);

    return;
  }
}
