import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './list-categories-use-case';

export class ListCategoriesController {
  constructor(private listCategoriesUseCase: ListCategoriesUseCase) {}

  async handle(req: Request, res: Response) {
    const categoriesList = await this.listCategoriesUseCase.execute();

    return res.status(201).json({ categoriesList });
  }
}
