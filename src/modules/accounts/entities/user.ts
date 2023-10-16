import { v4 as randomUUID } from 'uuid';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';

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

  isAdmin: boolean;

  avatar: string;

  created_at: Date;

  @Expose({ name: 'avatar_url' })
  get avatar_url(): string {
    switch (process.env.disk) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
