import { Request, Response } from 'express';
import { CreateCarSpecificationUseCase } from './create-car-specification-use-case';
import { container } from 'tsyringe';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { carId, specificationsId } = req.body;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const specificationCar = createCarSpecificationUseCase.execute({
      car_id: carId,
      specifications_id: specificationsId,
    });

    return res.status(201).json(specificationCar);
  }
}
