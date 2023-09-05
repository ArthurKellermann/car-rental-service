import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './create-user-use-case';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, username, email, password, driver_license } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      name,
      username,
      email,
      password,
      driver_license,
    });

    return res.status(201).send();
  }
}
