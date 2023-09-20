import 'reflect-metadata';
import { InMemoryCarsRepository } from '../../repositories/in-memory/in-memory-cars-repository';
import { ListAvailableCarsUseCase } from './list-available-cars-use-case';

let inMemoryCarsRepository: InMemoryCarsRepository;
let listCarsUseCase: ListAvailableCarsUseCase;

describe('List available cars', () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository();
    listCarsUseCase = new ListAvailableCarsUseCase(inMemoryCarsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'car_name',
      brand: 'car_brand',
      category_id: 'category_id',
      daily_rate: 140.0,
      description: 'car_description',
      fine_amount: 100,
      license_plate: 'IRI-5342',
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'car_name2',
      brand: 'car_brand2',
      category_id: 'category_id2',
      daily_rate: 140.0,
      description: 'car_description',
      fine_amount: 100,
      license_plate: 'IRI-5342',
    });

    const cars = await listCarsUseCase.execute({
      brand: 'car_brand2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'car_name3',
      brand: 'car_brand3',
      category_id: 'category_id3',
      daily_rate: 140.0,
      description: 'car_description',
      fine_amount: 100,
      license_plate: 'IRI-5342',
    });

    const cars = await listCarsUseCase.execute({
      name: 'car_name3',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await inMemoryCarsRepository.create({
      name: 'car_name4',
      brand: 'car_brand4',
      category_id: 'category_id4',
      daily_rate: 140.0,
      description: 'car_description',
      fine_amount: 100,
      license_plate: 'IRI-5342',
    });

    const cars = await listCarsUseCase.execute({
      category_id: 'category_id4',
    });

    expect(cars).toEqual([car]);
  });
});
