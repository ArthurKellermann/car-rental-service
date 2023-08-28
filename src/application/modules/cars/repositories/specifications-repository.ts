import { Specification } from '../entities/specification';

export interface CreateSpecificationDTO {
  name: string;
  description: string;
}

export interface SpecificationRepository {
  create({ name, description }: CreateSpecificationDTO): void;
  findByName(name: string): Specification;
}
