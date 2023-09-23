import { PrismaClient } from '@prisma/client';
import { RentalsRepository } from '../../../modules/rentals/repositories/rental-repository';
import { inject, injectable } from 'tsyringe';
import { Rental } from '../../../modules/rentals/entities/rental';

@injectable()
export class PrismaRentalsRepository implements RentalsRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(data: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {}
  findOpenRentalByUser(user_id: string): Promise<Rental> {
    throw new Error('Method not implemented.');
  }
}
