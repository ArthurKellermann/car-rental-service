import { CarsRepository } from '../cars-repository';
import { CreateCarDto } from '../dtos/create-car-dto';
import { Car } from '../../entities/car';

export class InMemoryCarsRepository implements CarsRepository {
  private cars: Car[];

  constructor() {
    this.cars = [];
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    specifications,
  }: CreateCarDto): Promise<Car> {
    const car: Car = new Car();

    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      created_at: new Date(),
      specifications,
    });

    await this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.cars.find(
      (car) => car.license_plate === license_plate,
    );

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars = await this.cars.filter((car) => {
      if (
        car.available == true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car;
      }
      return null;
    });

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.cars.find((car) => car.id === id);

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<Car> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;

    return this.cars[findIndex];
  }
}
