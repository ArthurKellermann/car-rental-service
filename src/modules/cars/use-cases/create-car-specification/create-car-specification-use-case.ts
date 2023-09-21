import { inject, injectable } from 'tsyringe';
import { CarsRepository } from '../../repositories/cars-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { SpecificationsRepository } from '../../repositories/specifications-repository';
import { Car } from '../../entities/car';

interface CreateCarSpecificationRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject('PrismaCarsRepository')
    private carsRepository: CarsRepository,
    private specificationsRepository: SpecificationsRepository,
  ) {}

  async execute({
    car_id,
    specifications_id,
  }: CreateCarSpecificationRequest): Promise<Car> {
    const car = await this.carsRepository.findById(car_id);

    if (!car) {
      throw new AppError({
        message: 'Car does not exists',
      });
    }

    const specifications =
      await this.specificationsRepository.findByIds(specifications_id);

    await this.carsRepository.updateSpecifications(car.id, specifications);

    return car;
  }
}
