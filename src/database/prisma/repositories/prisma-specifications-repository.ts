import { PrismaClient } from '@prisma/client';
import { Specification } from '../../../modules/cars/entities/specification';
import { CreateSpecificationDTO } from '../../../modules/cars/repositories/dtos/create-specification-dto';
import { SpecificationsRepository } from '../../../modules/cars/repositories/specifications-repository';
import { injectable, inject } from 'tsyringe';

@injectable()
export class PrismaSpecificationsRepository
  implements SpecificationsRepository
{
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
