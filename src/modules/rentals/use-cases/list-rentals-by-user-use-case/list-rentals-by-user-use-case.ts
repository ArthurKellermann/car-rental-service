import { inject, injectable } from 'tsyringe';
import { RentalsRepository } from '../../repositories/rental-repository';
import { CarsRepository } from '../../../cars/repositories/cars-repository';
import { Rental } from '../../entities/rental';
import { RentalViewModel } from '../../../../shared/infra/http/view-models/rental-view-model';
import { CarViewModel } from '../../../../shared/infra/http/view-models/car-view-model';

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('PrismaRentalsRepository')
    private rentalsRepository: RentalsRepository,
    @inject('PrismaCarsRepository')
    private carsRepository: CarsRepository,
  ) {}

  async execute(user_id: string) {
    const rentalsList: Rental[] = [];
    const rentals = await this.rentalsRepository.listRentalsByUser(user_id);

    for (const rental of rentals) {
      const car = await this.carsRepository.findById(rental.car_id);
      rental.car = CarViewModel.toHTTP(car);

      rentalsList.push(rental);
    }

    return RentalViewModel.toHTTPList(rentalsList);
  }
}
