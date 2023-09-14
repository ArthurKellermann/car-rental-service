import { User } from '../../entities/user';
import { CreateUserDTO } from '../implementations/dtos/create-user-dto';
import { UserRepository } from '../implementations/user-repository';

export class InMemoryUsersRepository implements UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async create({
    driver_license,
    email,
    name,
    password,
    username,
  }: CreateUserDTO): Promise<void> {
    const user: User = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
      username,
    });

    this.users.push(user);

    return;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}
