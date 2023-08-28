import { Category } from '../entities/Category';
import {
  CategoriesRepository,
  ICreateCategoryDTO,
} from './categories-repository';

export class PostgresCategoriesRepository implements CategoriesRepository {
  findByName(name: string): Category {
    console.log(name);
    return null;
  }
  list(): Category[] {
    return null;
  }
  create({ name, description }: ICreateCategoryDTO): void {
    console.log(name, description);
  }
}
