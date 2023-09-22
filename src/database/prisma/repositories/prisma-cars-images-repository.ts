import { inject, injectable } from 'tsyringe';
import { CarImage } from '../../../modules/cars/entities/car-image';
import { CarsImagesRepository } from '../../../modules/cars/repositories/cars-images-repository';
import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaCarsImagesRepository implements CarsImagesRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const imagesCars = await this.prisma.imagesCars.create({
      data: {
        car_id,
        image_name,
      },
    });

    return imagesCars;
  }
}
