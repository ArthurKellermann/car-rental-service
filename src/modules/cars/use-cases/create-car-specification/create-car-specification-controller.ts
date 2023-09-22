import { Request, Response } from 'express';
import { CreateCarSpecificationUseCase } from './create-car-specification-use-case';
import { container } from 'tsyringe';
import { CarViewModel } from '../../../../shared/infra/http/view-models/car-view-model';

export class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { specificationsId } = req.body;
    const { carId } = req.params;

    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase,
    );

    const specificationCar = await createCarSpecificationUseCase.execute({
      car_id: carId,
      specifications_id: specificationsId,
    });

    return res.status(201).json(CarViewModel.toHTTP(specificationCar));
  }
}
