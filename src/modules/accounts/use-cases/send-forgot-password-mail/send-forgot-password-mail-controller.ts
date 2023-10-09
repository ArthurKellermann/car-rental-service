import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { SendForgotPasswordMailUseCase } from './send-forgot-password-mail-use-case';

export class SendForgotPasswordMailController {
  constructor() {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotPasswordMailUseCase = container.resolve(
      SendForgotPasswordMailUseCase,
    );

    await sendForgotPasswordMailUseCase.execute(email);

    return res.status(200).send();
  }
}
