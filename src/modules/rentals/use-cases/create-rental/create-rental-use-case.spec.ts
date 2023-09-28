import dayjs from 'dayjs';
import { InMemoryRentalsRepository } from '../../repositories/in-memory/in-memory-rentals-repository';
import { DayjsDateProvider } from '../../../../shared/container/providers/date-provider/implementations/dayjs-date-provider';
import { CreateRentalUseCase } from './create-rental-use-case';
import { AppError } from '../../../../shared/infra/errors/app-error';
import { InMemoryCarsRepository } from '../../../cars/repositories/in-memory/in-memory-cars-repository';

let createRentalUseCase: CreateRentalUseCase;
let inMemoryRentalsRepository: InMemoryRentalsRepository;
let inMemoryCarsRepository: InMemoryCarsRepository;
let dayjsDateProvider: DayjsDateProvider;

describe('Create rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    inMemoryCarsRepository = new InMemoryCarsRepository();
    createRentalUseCase = new CreateRentalUseCase(
      inMemoryRentalsRepository,
      dayjsDateProvider,
      inMemoryCarsRepository,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('start_date');
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });
    await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });
    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '123112',
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(
      new AppError({
        message: 'There is a rental in progress for user',
        statusCode: 400,
      }),
    );
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'Name car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    await createRentalUseCase.execute({
      user_id: '123',
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: '321',
        car_id: car.id,
        expected_return_date: dayAdd24Hours,
      }),
    ).rejects.toEqual(
      new AppError({
        message: 'Car is unavailable',
      }),
    );
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(
      new AppError({
        message: 'Invalid return time',
      }),
    );
  });
});
