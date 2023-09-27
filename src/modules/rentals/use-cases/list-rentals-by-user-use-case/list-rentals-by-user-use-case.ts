import { inject, injectable } from 'tsyringe';
import { RentalsRepository } from '../../repositories/rental-repository';

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject('PrismaRentalsRepository')
    private rentalsRepository: RentalsRepository,
  ) {}

  async execute(user_id: string) {
    const list = await this.rentalsRepository.listRentalsByUser(user_id);

    return list;
  }
}
