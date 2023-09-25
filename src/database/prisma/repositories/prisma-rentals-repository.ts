import { PrismaClient } from '@prisma/client';
import { RentalsRepository } from '../../../modules/rentals/repositories/rental-repository';
import { inject, injectable } from 'tsyringe';
import { Rental } from '../../../modules/rentals/entities/rental';
import { CreateRentalDto } from '../../../modules/rentals/repositories/dtos/create-rental-dto';

@injectable()
export class PrismaRentalsRepository implements RentalsRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create({
    car_id,
    expected_return_date,
    user_id,
  }: CreateRentalDto): Promise<Rental> {
    const rental = await this.prisma.rental.create({
      data: {
        car_id,
        expected_return_date,
        user_id,
      },
    });

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.prisma.rental.findFirst({
      where: {
        car_id,
      },
    });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.prisma.rental.findFirst({
      where: {
        user_id,
      },
    });

    return openByUser;
  }
}
