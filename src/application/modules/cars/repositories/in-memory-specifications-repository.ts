import { Specification } from '../entities/specification';
import {
  CreateSpecificationDTO,
  SpecificationRepository,
} from './specifications-repository';

export class InMemorySpecificationsRepository
  implements SpecificationRepository
{
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }
  create({ name, description }: CreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(
      (specification) => specification.name === name,
    );

    return specification;
  }
}
