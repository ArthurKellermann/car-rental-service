import { CreateCarDto } from './dtos/create-car-dto';

export interface CarsRepository {
  create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: CreateCarDto): Promise<void>;
}
