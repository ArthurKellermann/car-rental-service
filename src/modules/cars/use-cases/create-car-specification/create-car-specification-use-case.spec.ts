import 'reflect-metadata';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { InMemoryCarsRepository } from '../../repositories/in-memory/in-memory-cars-repository';
import { CreateCarSpecificationUseCase } from './create-car-specification-use-case';
import { InMemorySpecificationsRepository } from '../../repositories/in-memory/in-memory-specifications-repository';

let inMemoryCarsRepository: InMemoryCarsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let inMemorySpecificationsRepository: InMemorySpecificationsRepository;

describe('Create car specification', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      inMemoryCarsRepository,
      inMemorySpecificationsRepository,
    );
  });

  it('should not be able to add a new specification to a non-existent car', async () => {
    const car_id = '1234';
    const specifications_id = ['54321'];

    await expect(
      createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const specification = await inMemorySpecificationsRepository.create({
      description: 'test',
      name: 'nametest',
    });

    const specifications_id = [specification.id];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
