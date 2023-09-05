import { CreateUserDTO } from './dtos/create-user-dto';

export interface UserRepository {
  create(user: CreateUserDTO): Promise<void>;
}
