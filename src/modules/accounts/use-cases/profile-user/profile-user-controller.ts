import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ProfileUserUseCase } from './profile-user-use-case';
import { UserViewModel } from '../../../../shared/infra/http/view-models/user-view-model';

export class ProfileUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const profileUserUseCase = container.resolve(ProfileUserUseCase);

    const user = await profileUserUseCase.execute(id);

    res.status(200).json(UserViewModel.toHTTP(user));
  }
}
