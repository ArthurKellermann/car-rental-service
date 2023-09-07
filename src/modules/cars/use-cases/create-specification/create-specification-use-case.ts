import { inject, injectable } from 'tsyringe';
import { SpecificationRepository } from '../../repositories/implementations/specifications-repository';
import { AppError } from '../../../../errors/app-error';

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
