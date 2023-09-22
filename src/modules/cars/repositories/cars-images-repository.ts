import { CarImage } from '../entities/car-image';

export interface CarsImagesRepository {
  create(car_id: string, image_name: string): Promise<CarImage>;
}
