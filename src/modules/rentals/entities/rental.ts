import { v4 as randomUUID } from 'uuid';
import { Car } from '../../cars/entities/car';

export class Rental {
  id?: string;

  car?: Car;

  car_id: string;

  user_id: string;

  start_date: Date;

  end_date: Date;

  expected_return_date: Date;

  total: number;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}
