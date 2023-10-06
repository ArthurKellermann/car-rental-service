import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthenticateUserUseCase } from './authenticate-user-use-case';

export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase);

    const authenticatedUser = await authenticateUserUseCase.execute({
      email,
      password,
    });

    return res.status(200).json(authenticatedUser);
  }
}
