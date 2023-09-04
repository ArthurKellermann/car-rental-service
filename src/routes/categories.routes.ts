import { Router } from 'express';
import multer from 'multer';
import createCategoryController from '../modules/cars/use-cases/create-category';
import listCategoriesController from '../modules/cars/use-cases/list-categories';
import { importCategoryController } from '../modules/cars/use-cases/import-category';

const categoriesRoutes = Router();

const uplaod = multer({
  dest: './tmp',
});

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController().handle(req, res);
});

categoriesRoutes.get('/', (req, res) => {
  return listCategoriesController().handle(req, res);
});

categoriesRoutes.post('/import', uplaod.single('file'), (req, res) => {
  return importCategoryController.handle(req, res);
});

export { categoriesRoutes };
