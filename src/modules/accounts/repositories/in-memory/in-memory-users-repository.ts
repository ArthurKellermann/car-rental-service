import { User } from '../../entities/user';
import { CreateUserDTO } from '../../dtos/create-user-dto';
import { UserRepository } from '../user-repository';

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

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find((user) => user.username === username);

    return user;
  }

  async updateUserPassword(id: string, password: string): Promise<void> {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    user.password = password;
  }

  async updateUserAvatar({ avatar, id }: User): Promise<User> {
    const user = this.users.find((user) => user.avatar === id);
    if (!user) {
      throw new Error('User not found');
    }
    user.avatar = avatar;

    return user;
  }
}
