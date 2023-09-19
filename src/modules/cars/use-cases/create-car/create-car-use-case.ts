import { inject, injectable } from 'tsyringe';
import { CarsRepository } from '../../repositories/cars-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { Car } from '../../entities/car';

interface CreateCarUseCaseRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
export class CreateCarUseCase {
  constructor(
    @inject('PrismaCarsRepository')
    private carsRepository: CarsRepository,
  ) {}

  async execute({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
  }: CreateCarUseCaseRequest): Promise<Car> {
    const carAlreadyExists =
      await this.carsRepository.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new AppError({
        message: 'Car already exists',
      });
    }

    const car = await this.carsRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    return car;
  }
}
