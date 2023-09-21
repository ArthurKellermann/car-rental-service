import { Specification } from '../entities/specification';
import { CreateSpecificationDTO } from './dtos/create-specification-dto';

export interface SpecificationsRepository {
  create({ name, description }: CreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
