import { InMemoryCarsRepository } from '../../repositories/in-memory/in-memory-cars-repository';
import { CreateCarUseCase } from './create-car-use-case';

let createCarUseCase: CreateCarUseCase;
let inMemoryCarsRepository: InMemoryCarsRepository;

describe('Create car', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createCarUseCase = new CreateCarUseCase(inMemoryCarsRepository);
  });
  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });
  });
});
