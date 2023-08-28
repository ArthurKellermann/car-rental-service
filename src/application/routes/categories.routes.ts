import { Router } from 'express';
import { InMemoryCategoriesRepository } from '../modules/cars/repositories/in-memory-categories-repository';
import { createCategoryController } from '../modules/cars/use-cases/create-category';

const categoriesRoutes = Router();

const categoriesRepository = new InMemoryCategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  const categoriesList = categoriesRepository.list();

  return res.status(200).json({ categoriesList });
});

export { categoriesRoutes };
