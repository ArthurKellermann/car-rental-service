import { container } from 'tsyringe';
import { ListRentalsByUserUseCase } from './list-rentals-by-user-use-case';
import { Request, Response } from 'express';

export class ListRentalsByUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listRentalsByUserUseCase = container.resolve(
      ListRentalsByUserUseCase,
    );

    const rentalsByUser = await listRentalsByUserUseCase.execute(id);

    return res.status(200).json(rentalsByUser);
  }
}
