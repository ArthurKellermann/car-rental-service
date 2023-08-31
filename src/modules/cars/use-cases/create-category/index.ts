import { InMemoryCategoriesRepository } from '../../repositories/in-memory-categories-repository';
import { CreateCategoryController } from './create-category-controller';
import { CreateCategoryUseCase } from './create-category-use-case';

const categoriesRepository = InMemoryCategoriesRepository.getInstance();

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
);

export { createCategoryController };
