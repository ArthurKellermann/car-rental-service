import { container } from 'tsyringe';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/categories-repository';
import { PrismaCategoriesRepository } from '../../database/prisma-categories-repository';

container.registerSingleton<CategoriesRepository>(
  'PrismaCategoriesRepository',
  PrismaCategoriesRepository,
);
