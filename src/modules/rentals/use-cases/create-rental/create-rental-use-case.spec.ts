import { AppError } from '../../../../shared/infra/errors/app-error';
import { InMemoryRentalsRepository } from '../../repositories/in-memory/in-memory-rentals-repository';
import { CreateRentalUseCase } from './create-rental-use-case';

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalsRepository: InMemoryRentalsRepository;

describe('Create rental', () => {
  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(inMemoryRentalsRepository);
  });

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '12312',
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '12312',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '123112',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: '321',
        car_id: 'test',
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
