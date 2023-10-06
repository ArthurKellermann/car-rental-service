import { PrismaClient } from '@prisma/client';
import { Specification } from '../../entities/specification';
import { CreateSpecificationDTO } from '../../dtos/create-specification-dto';
import { SpecificationsRepository } from '../specifications-repository';
import { injectable, inject } from 'tsyringe';

@injectable()
export class PrismaSpecificationsRepository
  implements SpecificationsRepository
{
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}
  async create({
    name,
    description,
  }: CreateSpecificationDTO): Promise<Specification> {
    const specification = await this.prisma.specification.create({
      data: {
        name,
        description,
      },
    });

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.prisma.specification.findUnique({
      where: {
        name,
      },
    });

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = [];

    for (const id of ids) {
      const specification = await this.prisma.specification.findMany({
        where: {
          id,
        },
      });

      specifications.push(specification);
    }

    return specifications;
  }
}
