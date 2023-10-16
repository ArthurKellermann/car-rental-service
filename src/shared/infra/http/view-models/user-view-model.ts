import { User } from '../../../../modules/accounts/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      driver_license: user.driver_license,
      avatar: user.avatar,
      url: user.avatar_url,
    };
  }
}
