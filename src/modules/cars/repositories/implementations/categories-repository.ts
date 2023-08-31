import { Category } from '../../entities/category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}
export interface CategoriesRepository {
  findByName(name: string): Promise<Category>;
  list(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}
