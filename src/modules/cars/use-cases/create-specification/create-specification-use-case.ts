import { inject, injectable } from 'tsyringe';
import { SpecificationRepository } from '../../repositories/implementations/specifications-repository';

interface CreateSpecificationUseCaseRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('PrismaSpecificationsRepository')
    private specificationsRepository: SpecificationRepository,
  ) {}

  async execute({ name, description }: CreateSpecificationUseCaseRequest) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Speficiation already exists');
    }
    this.specificationsRepository.create({
      name,
      description,
    });
  }
}
