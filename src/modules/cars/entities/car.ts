import { v4 as randomUUID } from 'uuid';
import { IsNotEmpty } from 'class-validator';

export class Car {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  description: string;

  category_id: string;

  daily_rate: number;

  available: boolean;

  fine_amount: number;

  license_plate: string;

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
      this.available = true;
      this.created_at = new Date();
    }
  }
}
