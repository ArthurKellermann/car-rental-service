import { Category } from '../../entities/category';
import { CategoriesRepository } from '../../repositories/implementations/categories-repository';

export class ListCategoriesUseCase {
  constructor(private categoriesRepository: CategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}
