import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/use-cases/create-car/create-car-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { ensureAdmin } from '../middlewares/ensure-admin';
import { ListAvailableCarsController } from '../../../../modules/cars/use-cases/list-available-cars/list-available-cars-controller';
import { CreateCarSpecificationController } from '../../../../modules/cars/use-cases/create-car-specification/create-car-specification-controller';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post(
  '/specifications/:carId',
  createCarSpecificationController.handle,
);

export { carsRoutes };
