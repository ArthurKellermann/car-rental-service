import { Specification } from '../../entities/specification';
import { SpecificationsRepository } from '../specifications-repository';
import { CreateSpecificationDTO } from '../dtos/create-specification-dto';

export class InMemorySpecificationsRepository
  implements SpecificationsRepository
{
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }
  async create({ name, description }: CreateSpecificationDTO): Promise<void> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    });

    await this.specifications.push(specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.specifications.find(
      (specification) => specification.name === name,
    );

    return specification;
  }
}
