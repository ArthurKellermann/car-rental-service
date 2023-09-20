import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { CarsRepository } from '../../repositories/cars-repository';
import { Car } from '../../entities/car';

interface ListAvailableCarsUseCaseRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListAvailableCarsUseCase {
  constructor(
    @inject('PrismaCarsRepository')
    private carsRepository: CarsRepository,
  ) {}

  async execute({
    category_id,
    brand,
    name,
  }: ListAvailableCarsUseCaseRequest): Promise<Car[]> {
    const cars = await this.carsRepository.findAvailable(
      brand,
      category_id,
      name,
    );

    return cars;
  }
}
