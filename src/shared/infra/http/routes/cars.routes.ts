import { Router } from 'express';
import { CreateCarController } from '../../../../modules/cars/use-cases/create-car/create-car-controller';

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post('/', createCarController.handle);

export { carsRoutes };
