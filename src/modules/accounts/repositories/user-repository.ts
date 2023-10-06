import { User } from '../entities/user';
import { CreateUserDTO } from '../dtos/create-user-dto';

export interface UserRepository {
  create(user: CreateUserDTO): Promise<void>;
  findByEmail(email: string): Promise<User>;
  findById(id: string): Promise<User>;
}
