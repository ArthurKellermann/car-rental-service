import { v4 as randomUUID } from 'uuid';
import { IsNotEmpty } from 'class-validator';
import { Specification } from './specification';

export class Car {
  id?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  brand: string;

  description: string;

  @IsNotEmpty()
  category_id: string;

  daily_rate: number;

  available: boolean;

  fine_amount: number;

  license_plate: string;

  specifications?: Specification[];

  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
      this.available = true;
      this.created_at = new Date();
    }
  }
}
