import { Router } from 'express';
import { CreateCategoryService } from '../services/create-category-service';
import { InMemoryCategoriesRepository } from '../repositories/in-memory-categories-repository';

const categoriesRoutes = Router();

const categoriesRepository = new InMemoryCategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const createCategoryService = new CreateCategoryService(categoriesRepository);

  createCategoryService.execute({ name, description });

  return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
  const categoriesList = categoriesRepository.list();

  return res.status(200).json({ categoriesList });
});

export { categoriesRoutes };
