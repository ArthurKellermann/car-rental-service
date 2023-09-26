import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { CreateRentalController } from '../../../../modules/rentals/use-cases/create-rental/create-rental-controller';
import { DevolutionRentalController } from '../../../../modules/rentals/use-cases/devolution-rental/devolution-rental-controller';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post('/', ensureAuthenticated, createRentalController.handle);

rentalRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

export { rentalRoutes };
