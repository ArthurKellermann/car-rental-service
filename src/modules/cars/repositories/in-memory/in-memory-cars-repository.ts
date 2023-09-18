import { CarsRepository } from '../cars-repository';
import { CreateCarDto } from '../dtos/create-car-dto';
import { Car } from '../../entities/car';

export class InMemoryCarsRepository implements CarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }
  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: CreateCarDto): Promise<void> {
    const car: Car = new Car();

    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      created_at: new Date(),
    });

    await this.cars.push(car);

    return;
  }
}
