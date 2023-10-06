export interface CreateUserDTO {
  name: string;
  username: string;
  password: string;
  email: string;
  id?: string;
  avatar?: string;
  driver_license: string;
}
