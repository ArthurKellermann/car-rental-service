import { inject, injectable } from 'tsyringe';
import { CarsImagesRepository } from '../../repositories/cars-images-repository';
import { StorageProvider } from '../../../../shared/container/providers/storage-provider/storage-provider';

interface UploadCarImageUseCaseRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject('PrismaCarsImagesRepository')
    private carsImagesRepository: CarsImagesRepository,
    @inject('StorageProvider') private storageProvider: StorageProvider,
  ) {}

  async execute({
    car_id,
    images_name,
  }: UploadCarImageUseCaseRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, 'cars');
    });
  }
}
