import { Router } from 'express';
import { CreateSpecificationService } from '../modules/cars/services/create-specification-service';
import { InMemorySpecificationsRepository } from '../modules/cars/repositories/in-memory-specifications-repository';

const specificationsRoutes = Router();

const specificationsRepository = new InMemorySpecificationsRepository();

specificationsRoutes.post('/', (req, res) => {
  const { name, description } = req.body;
  const createSpeficiationService = new CreateSpecificationService(
    specificationsRepository,
  );

  createSpeficiationService.execute({
    name,
    description,
  });

  return res.status(201).send();
});

export { specificationsRoutes };
