import { Category } from '../entities/category';

export interface ICreateCategoryDTO {
  name: string;
  description: string;
}
export interface CategoriesRepository {
  findByName(name: string): Category;
  list(): Category[];
  create({ name, description }: ICreateCategoryDTO): void;
}
