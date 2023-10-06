import { Car } from '../entities/car';
import { CreateCarDto } from '../dtos/create-car-dto';

export interface CarsRepository {
  create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: CreateCarDto): Promise<Car>;

  findByLicensePlate(license_plate: string): Promise<Car>;

  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>;

  findById(id: string): Promise<Car>;

  updateAvailable(id: string, available: boolean): Promise<Car>;
}
