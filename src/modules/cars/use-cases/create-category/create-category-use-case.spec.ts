import 'reflect-metadata';
import { Category } from '../../entities/category';
import { InMemoryCategoriesRepository } from '../../repositories/in-memory/in-memory-categories-repository';
import { CreateCategoryUseCase } from './create-category-use-case';
import { AppError } from '../../../../errors/app-error';

let createCategory: CreateCategoryUseCase;
let inMemoryCategoriesRepository: InMemoryCategoriesRepository;

describe('Create a category', () => {
  beforeEach(() => {
    inMemoryCategoriesRepository = new InMemoryCategoriesRepository();
    createCategory = new CreateCategoryUseCase(inMemoryCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category: Category = {
      name: 'category-example',
      description: 'description-example',
      created_at: new Date(),
    };

    await createCategory.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await inMemoryCategoriesRepository.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category: Category = {
        name: 'category-example',
        description: 'description-example',
        created_at: new Date(),
      };

      await createCategory.execute({
        name: category.name,
        description: category.description,
      });

      await createCategory.execute({
        name: category.name,
        description: category.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
