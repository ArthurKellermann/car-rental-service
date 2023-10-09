import { Router } from 'express';
import { SendForgotPasswordMailController } from '../../../../modules/accounts/use-cases/send-forgot-password-mail/send-forgot-password-mail-controller';

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle);

export { passwordRoutes };
