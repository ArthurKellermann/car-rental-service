import { Category } from '../entities/category';
import { CategoriesRepository } from './implementations/categories-repository';
import { CreateCategoryDTO } from './implementations/dtos/create-category-dto';

export class InMemoryCategoriesRepository implements CategoriesRepository {
  private categories: Category[];

  private static INSTANCE: InMemoryCategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): InMemoryCategoriesRepository {
    if (!InMemoryCategoriesRepository.INSTANCE) {
      InMemoryCategoriesRepository.INSTANCE =
        new InMemoryCategoriesRepository();
    }

    return InMemoryCategoriesRepository.INSTANCE;
  }
  async create({ name, description }: CreateCategoryDTO): Promise<void> {
    const category: Category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}
