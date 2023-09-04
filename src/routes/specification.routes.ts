import { Router } from 'express';
import { CreateSpecificationController } from '../modules/cars/use-cases/create-specification/create-specification-controller';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);

export { specificationsRoutes };
