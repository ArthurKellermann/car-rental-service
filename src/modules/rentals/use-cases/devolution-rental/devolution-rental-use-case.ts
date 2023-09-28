import { inject, injectable } from 'tsyringe';
import { RentalsRepository } from '../../repositories/rental-repository';
import { CarsRepository } from '../../../cars/repositories/cars-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { DateProvider } from '../../../../shared/container/providers/date-provider/date-provider';
import { Rental } from '../../entities/rental';

interface DevolutionRentalUseCaseRequest {
  id: string;
  user_id: string;
}

@injectable()
export class DevolutionRentalUseCase {
  constructor(
    @inject('PrismaRentalsRepository')
    private rentalsRepository: RentalsRepository,
    @inject('PrismaCarsRepository')
    private carsRepository: CarsRepository,
    @inject('DateProvider')
    private dateProvider: DateProvider,
  ) {}
  async execute({ id }: DevolutionRentalUseCaseRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);
    const minimum_daily = 1;

    if (!rental) {
      throw new AppError({
        message: 'Rental does not exists',
      });
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    );
    if (daily <= 0) {
      daily = minimum_daily;
    }

    const delay = this.dateProvider.compareInDays(
      dateNow,
      rental.expected_return_date,
    );

    let total = 0;

    if (delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.updateRental(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
