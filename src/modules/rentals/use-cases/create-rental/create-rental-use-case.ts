import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { RentalsRepository } from '../../repositories/rental-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { Rental } from '../../entities/rental';

interface CreateRentaUseCaseRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(private rentalsRepository: RentalsRepository) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: CreateRentaUseCaseRequest): Promise<Rental> {
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

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}
