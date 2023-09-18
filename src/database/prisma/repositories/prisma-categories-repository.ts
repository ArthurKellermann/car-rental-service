import { PrismaClient } from '@prisma/client';
import { Category } from '../../../modules/cars/entities/category';
import { CategoriesRepository } from '../../../modules/cars/repositories/categories-repository';
import { CreateCategoryDTO } from '../../../modules/cars/repositories/dtos/create-category-dto';
import { injectable, inject } from 'tsyringe';

@injectable()
export class PrismaCategoriesRepository implements CategoriesRepository {
  constructor(@inject('PrismaClient') private prisma: PrismaClient) {}

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    await this.prisma.category.create({
      data: {
        name,
        description,
      },
    });
  }

  async list(): Promise<Category[]> {
    const listCategories = await this.prisma.category.findMany();
    return listCategories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: {
        name,
      },
    });
    return category;
  }
}
