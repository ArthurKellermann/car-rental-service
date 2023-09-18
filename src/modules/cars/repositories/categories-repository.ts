import { Category } from '../entities/category';
import { CreateCategoryDTO } from './dtos/create-category-dto';

export interface CategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: CreateCategoryDTO): Promise<void>;
}
