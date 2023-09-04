import { Router } from 'express';
import multer from 'multer';
import { CreateCategoryController } from '../modules/cars/use-cases/create-category/create-category-controller';
import { ListCategoriesController } from '../modules/cars/use-cases/list-categories/list-categories-controller';
import { ImportCategoryController } from '../modules/cars/use-cases/import-category/import-category-controller';

const categoriesRoutes = Router();

const uplaod = multer({
  dest: './tmp',
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  uplaod.single('file'),
  importCategoryController.handle,
);

export { categoriesRoutes };
