import { Router } from 'express';
import uploadConfig from '../../../../config/upload';
import multer from 'multer';
import { CreateCarController } from '../../../../modules/cars/use-cases/create-car/create-car-controller';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { ensureAdmin } from '../middlewares/ensure-admin';
import { ListAvailableCarsController } from '../../../../modules/cars/use-cases/list-available-cars/list-available-cars-controller';
import { CreateCarSpecificationController } from '../../../../modules/cars/use-cases/create-car-specification/create-car-specification-controller';
import { UploadCarImageController } from '../../../../modules/cars/use-cases/upload-car-image/upload-car-image-controller';

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

const upload = multer(uploadConfig);

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listAvailableCarsController.handle);
carsRoutes.post(
  '/specifications/:carId',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
);

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarImagesController.handle,
);

export { carsRoutes };
