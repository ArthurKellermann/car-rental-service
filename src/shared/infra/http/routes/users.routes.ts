import { Router } from 'express';
import multer from 'multer';
import { UpdateUserAvatarController } from '../../../../modules/accounts/use-cases/update-user-avatar/update-user-avatar-controller';
import { CreateUserController } from '../../../../modules/accounts/use-cases/create-user/create-user-controller';
import uploadConfig from '../../../../config/upload';
import { ensureAuthenticated } from '../middlewares/ensure-authenticated';
import { ProfileUserController } from '../../../../modules/accounts/use-cases/profile-user/profile-user-controller';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

usersRoutes.get('/', ensureAuthenticated, profileUserController.handle);

export { usersRoutes };
