import { v4 as randomUUID } from 'uuid';
import { IsNotEmpty } from 'class-validator';

export class Category {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
