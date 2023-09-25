import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { ensureAdmin } from '../middlewares/ensure-admin';
import { CreateRentalController } from '../../../../modules/rentals/use-cases/create-rental/create-rental-controller';

const rentalRoutes = Router();

const createRentalController = new CreateRentalController();

rentalRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createRentalController.handle,
);

export { rentalRoutes };
