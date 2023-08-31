import { InMemorySpecificationsRepository } from '../../repositories/in-memory-specifications-repository';
import { CreateSpecificationController } from './create-specification-controller';
import { CreateSpecificationUseCase } from './create-specification-use-case';

const specificationsRepository = new InMemorySpecificationsRepository();

const createSpecificationUseCase = new CreateSpecificationUseCase(
  specificationsRepository,
);

const createSpecificationController = new CreateSpecificationController(
  createSpecificationUseCase,
);

export { createSpecificationController };
