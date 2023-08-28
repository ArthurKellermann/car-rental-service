import { SpecificationRepository } from '../repositories/specifications-repository';

interface CreateSpeficicationRequest {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private speficiationsRepository: SpecificationRepository) {}
  execute({ name, description }: CreateSpeficicationRequest) {
    const spéficiationAlreadyExists =
      this.speficiationsRepository.findByName(name);

    if (spéficiationAlreadyExists) {
      throw new Error('Speficiation already exists');
    }
    this.speficiationsRepository.create({
      name,
      description,
    });
  }
}
