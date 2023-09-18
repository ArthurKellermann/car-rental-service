import { Category } from '../../entities/category';
import { CategoriesRepository } from '../categories-repository';
import { CreateCategoryDTO } from '../dtos/create-category-dto';

export class InMemoryCategoriesRepository implements CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category: Category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);

    return;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}
