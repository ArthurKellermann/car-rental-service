import { PrismaClient } from '@prisma/client';
import { Category } from '../modules/cars/entities/category';
import { CategoriesRepository } from '../modules/cars/repositories/implementations/categories-repository';
import { CreateCategoryDTO } from '../modules/cars/repositories/implementations/dtos/create-category-dto';

export class PrismaCategoriesRepository implements CategoriesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

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
