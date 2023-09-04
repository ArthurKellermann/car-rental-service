import { PrismaCategoriesRepository } from '../../../../database/prisma-categories-repository';
import { ListCategoriesController } from './list-categories-controller';
import { ListCategoriesUseCase } from './list-categories-use-case';

export default (): ListCategoriesController => {
  const categoriesRepository = new PrismaCategoriesRepository();

  const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository);

  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
  );
  return listCategoriesController;
};
