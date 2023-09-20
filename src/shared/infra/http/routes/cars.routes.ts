import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/use-cases/create-car/create-car-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { ensureAdmin } from '../middlewares/ensure-admin';
import { ListAvailableCarsController } from '../../../../modules/cars/use-cases/list-available-cars/list-available-cars-controller';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
