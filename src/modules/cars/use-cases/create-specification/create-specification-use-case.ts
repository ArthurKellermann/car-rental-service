import { SpecificationRepository } from '../../repositories/implementations/specifications-repository';

interface CreateSpecificationUseCaseRequest {
  name: string;
  description: string;
}

export class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationRepository) {}

  execute({ name, description }: CreateSpecificationUseCaseRequest) {
    const specificationAlreadyExists =
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Speficiation already exists');
    }
    this.specificationsRepository.create({
      name,
      description,
    });
  }
}
