import { User } from '../entities/user';
import { CreateUserDTO } from './implementations/dtos/create-user-dto';
import { UserRepository } from './implementations/user-repository';

export class InMemoryUsersRepository implements UserRepository {
  private specifications: User[];

  constructor() {
    this.specifications = [];
  }
  async create(user: CreateUserDTO): Promise<void> {}
}
