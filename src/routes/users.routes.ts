import { Router } from 'express';
import multer from 'multer';
import { UdpateUserAvatarController } from '../modules/accounts/use-cases/update-user-avatar/update-user-avatar-controller';
import { CreateUserController } from '../modules/accounts/use-cases/create-user/create-user-controller';
import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));
const createUserController = new CreateUserController();
const udpateUserAvatarController = new UdpateUserAvatarController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  udpateUserAvatarController.handle,
);

export { usersRoutes };
