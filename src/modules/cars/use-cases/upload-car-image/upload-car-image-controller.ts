import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadCarImageUseCase } from './upload-car-image-use-case';

interface FileInterface {
  filename: string;
}

export class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as FileInterface[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      images_name,
    });

    return res.status(201).send();
  }
}
