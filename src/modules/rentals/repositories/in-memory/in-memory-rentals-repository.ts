import { Rental } from '../../entities/rental';
import { CreateRentalDto } from '../dtos/create-rental-dto';
import { RentalsRepository } from '../rental-repository';

export class InMemoryRentalsRepository implements RentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: CreateRentalDto): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && rental.end_date === null,
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && rental.end_date === null,
    );
  }
}
