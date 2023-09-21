import { PrismaClient } from '@prisma/client';
import { CarsRepository } from '../../../modules/cars/repositories/cars-repository';
import { Car } from '../../../modules/cars/entities/car';
import { CreateCarDto } from '../../../modules/cars/repositories/dtos/create-car-dto';
import { inject, injectable } from 'tsyringe';
import { Specification } from '../../../modules/cars/entities/specification';

interface carFilterBody {
  available: boolean;
  brand?: string;
  category_id?: string;
  name?: string;
}

@injectable()
export class PrismaCarsRepository implements CarsRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

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
    const car = await this.prisma.car.create({
      data: {
        name,
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
      },
    });

    if (specifications && specifications.length > 0) {
      await this.prisma.specificationsCars.createMany({
        data: specifications.map((specId) => ({
          car_id: car.id,
          specification_id: specId,
        })),
      });
    }

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.prisma.car.findUnique({
      where: {
        license_plate,
      },
    });

    return car;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carFilter: carFilterBody = {
      available: true,
    };

    if (brand) {
      carFilter.brand = brand;
    }

    if (category_id) {
      carFilter.category_id = category_id;
    }

    if (name) {
      carFilter.name = name;
    }

    const cars = await this.prisma.car.findMany({
      where: carFilter,
    });

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.prisma.car.findUnique({
      where: {
        id,
      },
    });

    return car;
  }

  async updateSpecifications(
    carId: string,
    specifications: Specification[],
  ): Promise<Car> {
    const specIds = specifications.map((spec) => spec.id);

    await this.prisma.specificationsCars.createMany({
      data: specIds.map((specId) => ({
        car_id: carId,
        specification_id: specId,
      })),
    });

    return this.findById(carId);
  }
}
