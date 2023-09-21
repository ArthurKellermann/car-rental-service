import { Router } from 'express';
import { CreateSpecificationController } from '../../../../modules/cars/use-cases/create-specification/create-specification-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { ensureAdmin } from '../middlewares/ensure-admin';
import { CreateCarSpecificationController } from '../../../../modules/cars/use-cases/create-car-specification/create-car-specification-controller';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
const createCarSpecificationController = new CreateCarSpecificationController();

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle,
);

specificationsRoutes.post('/cars', createCarSpecificationController.handle);

export { specificationsRoutes };
