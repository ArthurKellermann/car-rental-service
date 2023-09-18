import { inject, injectable } from 'tsyringe';
import { SpecificationsRepository } from '../../repositories/specifications-repository';
import { AppError } from '../../../../shared/infra/errors/app-error';

interface CreateSpecificationUseCaseRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateSpecificationUseCase {
  constructor(
    @inject('PrismaSpecificationsRepository')
    private specificationsRepository: SpecificationsRepository,
  ) {}

  async execute({ name, description }: CreateSpecificationUseCaseRequest) {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError({
        statusCode: 400,
        message: 'Specification already exists',
      });
    }
    this.specificationsRepository.create({
      name,
      description,
    });
  }
}
