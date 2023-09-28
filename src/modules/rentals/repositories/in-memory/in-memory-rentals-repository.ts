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
      (rental) => rental.car_id === car_id && !rental.end_date,
    );
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date,
    );
  }

  async findById(id: string): Promise<Rental> {
    return this.rentals.find((rental) => rental.id === id);
  }

  async listRentalsByUser(user_id: string): Promise<Rental[]> {
    return this.rentals.filter((rental) => rental.user_id === user_id);
  }

  async updateRental(rental: Rental): Promise<Rental> {
    const index = this.rentals.findIndex((rent) => rent.id === rental.id);

    if (index === -1) {
      throw new Error('Rental not found');
    }

    this.rentals[index] = { ...this.rentals[index], ...rental };

    return this.rentals[index];
  }
}
