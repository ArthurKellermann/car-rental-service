import 'reflect-metadata';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';
import { RentalsRepository } from '../../repositories/rental-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { Rental } from '../../entities/rental';
import { DateProvider } from '../../../../shared/container/providers/date-provider/date-provider';

dayjs.extend(utc);

interface CreateRentaUseCaseRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('PrismaRentalsRepository')
    private rentalsRepository: RentalsRepository,
    @inject('DateProvider')
    private dateProvider: DateProvider,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: CreateRentaUseCaseRequest): Promise<Rental> {
    const minimumHour = 24;
    const carUnavailable =
      await this.rentalsRepository.findOpenRentalByCar(car_id);

    if (carUnavailable) {
      throw new AppError({
        message: 'Car is unavailable',
      });
    }

    const rentalOpenToUser =
      await this.rentalsRepository.findOpenRentalByUser(user_id);

    if (rentalOpenToUser) {
      throw new AppError({
        message: 'There is a rental in progress for user',
      });
    }

    const dateNow = this.dateProvider.dateNow();

    const compare = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compare < minimumHour) {
      throw new AppError({
        message: 'Invalid return time!',
      });
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}
