import { inject, injectable } from 'tsyringe';
import { CategoriesRepository } from '../../repositories/implementations/categories-repository';

interface CreateCategoryUseCaseRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('PrismaCategoriesRepository')
    private categoriesRepository: CategoriesRepository,
  ) {}

  async execute({
    name,
    description,
  }: CreateCategoryUseCaseRequest): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new Error('Category already exists');
    }

    this.categoriesRepository.create({ name, description });
  }
}
