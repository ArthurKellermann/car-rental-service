import { Car } from '../../../../modules/cars/entities/car';

export class CarViewModel {
  static toHTTP(car: Car) {
    return {
      id: car.id,
      name: car.name,
      description: car.description,
      brand: car.brand,
      license_plate: car.license_plate,
      available: car.available,
      daily_rate: car.daily_rate,
      fine_amount: car.fine_amount,
      category_id: car.category_id,
      created_at: car.created_at,
      specifications: car.specifications,
    };
  }

  static toHTTPList(cars: Car[]): Car[] {
    const mappedCars = [];
    for (const car of cars) {
      mappedCars.push(this.toHTTP(car));
    }

    return mappedCars;
  }
}
