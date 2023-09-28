import { Rental } from '../../../../modules/rentals/entities/rental';

export class RentalViewModel {
  static toHTTP(rental: Rental) {
    return {
      id: rental.id,
      car_id: rental.car_id,
      user_id: rental.user_id,
      start_date: rental.start_date,
      end_date: rental.end_date,
      expected_return_date: rental.expected_return_date,
      total: rental.total,
      created_at: rental.created_at,
      updated_at: rental.updated_at,
      car: rental.car,
    };
  }

  static toHTTPList(rentals: Rental[]): Rental[] {
    const mappedRentals = [];
    for (const rental of rentals) {
      mappedRentals.push(this.toHTTP(rental));
    }

    return mappedRentals;
  }
}
