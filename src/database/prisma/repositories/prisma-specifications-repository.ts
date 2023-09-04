import { PrismaClient } from '@prisma/client';
import { Specification } from '../../../modules/cars/entities/specification';
import { CreateSpecificationDTO } from '../../../modules/cars/repositories/implementations/dtos/create-specification-dto';
import { SpecificationRepository } from '../../../modules/cars/repositories/implementations/specifications-repository';
import { injectable, inject } from 'tsyringe';

@injectable()
export class PrismaSpecificationsRepository implements SpecificationRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    await this.prisma.specification.create({
      data: {
        name,
        description,
      },
    });

    return;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.prisma.specification.findUnique({
      where: {
        name,
      },
    });

    return specification;
  }
}
