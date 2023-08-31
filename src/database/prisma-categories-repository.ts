import { PrismaClient } from '@prisma/client';
import { Category } from '../modules/cars/entities/category';
import { CategoriesRepository } from '../modules/cars/repositories/implementations/categories-repository';
import { ICreateCategoryDTO } from '../modules/cars/repositories/implementations/categories-repository';

export class PrismaCategoriesRepository implements CategoriesRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    try {
      await this.prisma.category.create({
        data: {
          name,
          description,
        },
      });
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error('Failed to create category');
    }
  }

  async list(): Promise<Category[]> {
    try {
      const listCategories = await this.prisma.category.findMany();
      return listCategories;
    } catch (error) {
      console.error('Error listing categories:', error);
      throw new Error('Failed to list categories');
    }
  }

  async findByName(name: string): Promise<Category> {
    try {
      const category = await this.prisma.category.findUnique({
        where: {
          name,
        },
      });
      return category;
    } catch (error) {
      console.error('Error finding category by name:', error);
      throw new Error('Failed to find category by name');
    }
  }
}
