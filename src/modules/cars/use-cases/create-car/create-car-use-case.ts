import { inject, injectable } from 'tsyringe';
import { CarsRepository } from '../../repositories/cars-repository';

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
    @inject('PrismaCategoriesRepository')
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
  }: CreateCarUseCaseRequest): Promise<void> {
    await this.carsRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
    });

    return;
  }
}
