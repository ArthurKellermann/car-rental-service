import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UdpateUserAvatarUseCase } from './update-user-avatar-use-case';

export class UdpateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const avatar_file = req.file.filename;

    const udpateUserAvatarUseCase = container.resolve(UdpateUserAvatarUseCase);

    await udpateUserAvatarUseCase.execute({
      user_id: id,
      avatar_file,
    });

    return res.status(204).send();
  }
}
