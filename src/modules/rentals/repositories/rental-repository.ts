import { Rental } from '../entities/rental';
import { CreateRentalDto } from './dtos/create-rental-dto';

export interface RentalsRepository {
  create(data: CreateRentalDto): Promise<Rental>;
  findOpenRentalByCar(car_id: string): Promise<Rental>;
  findOpenRentalByUser(user_id: string): Promise<Rental>;
  findById(id: string): Promise<Rental>;
}
