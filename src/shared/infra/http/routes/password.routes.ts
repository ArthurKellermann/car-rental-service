import { Router } from 'express';
import { SendForgotPasswordMailController } from '../../../../modules/accounts/use-cases/send-forgot-password-mail/send-forgot-password-mail-controller';
import { ResetPasswordUserController } from '../../../../modules/accounts/use-cases/reset-password-user/reset-password-user-controller';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);
passwordRoutes.post('/reset', resetPasswordUserController.handle);

export { passwordRoutes };
