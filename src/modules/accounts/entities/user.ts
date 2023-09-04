import { v4 as randomUUID } from 'uuid';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class User {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  driver_license: string;

  idAdmin: boolean;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
