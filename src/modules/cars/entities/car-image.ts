import { IsNotEmpty } from 'class-validator';
import { v4 as randomUUID } from 'uuid';

export class CarImage {
  id?: string;

  @IsNotEmpty()
  car_id: string;

  image_name: string;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
