import { PrismaClient } from '@prisma/client';
import { CarsRepository } from '../../../modules/cars/repositories/cars-repository';
import { Car } from '../../../modules/cars/entities/car';
import { CreateCarDto } from '../../../modules/cars/repositories/dtos/create-car-dto';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../shared/infra/errors/app-error';

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

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.prisma.car.findUnique({
      where: {
        license_plate,
      },
    });

    if (!car) {
      throw new AppError({
        message: 'Car does not exists',
      });
    }

    return car;
  }
}
