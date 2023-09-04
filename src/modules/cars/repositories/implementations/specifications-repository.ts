import { Specification } from '../../entities/specification';
import { CreateSpecificationDTO } from './dtos/create-specification-dto';

export interface SpecificationRepository {
  create({ name, description }: CreateSpecificationDTO): Promise<void>;
  findByName(name: string): Promise<Specification>;
}
