import { PrismaClient } from '@prisma/client';
import { RentalsRepository } from '../rental-repository';
import { inject, injectable } from 'tsyringe';
import { Rental } from '../../entities/rental';
import { CreateRentalDto } from '../../dtos/create-rental-dto';

@injectable()
export class PrismaRentalsRepository implements RentalsRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}
  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    total,
  }: CreateRentalDto): Promise<Rental> {
    const rental = await this.prisma.rental.create({
      data: {
        car_id,
        expected_return_date,
        user_id,
        id,
        end_date,
        total,
      },
    });

    return rental;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.prisma.rental.findFirst({
      where: {
        car_id,
        end_date: null,
      },
    });

    return openByCar;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.prisma.rental.findFirst({
      where: {
        user_id,
        end_date: null,
      },
    });

    return openByUser;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.prisma.rental.findUnique({
      where: {
        id,
      },
    });

    return rental;
  }

  async listRentalsByUser(user_id: string): Promise<Rental[]> {
    const rentals = await this.prisma.rental.findMany({
      where: {
        user_id,
      },
    });

    return rentals;
  }

  async updateRental({
    car_id,
    end_date,
    expected_return_date,
    start_date,
    total,
    user_id,
    id,
  }: Rental): Promise<Rental> {
    const updatedRental = await this.prisma.rental.update({
      data: {
        car_id,
        end_date,
        expected_return_date,
        start_date,
        total,
        id,
        user_id,
        updated_at: new Date(),
      },
      where: {
        id,
      },
    });

    return updatedRental;
  }
}
