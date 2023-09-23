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

    console.log(rental);

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });
});
