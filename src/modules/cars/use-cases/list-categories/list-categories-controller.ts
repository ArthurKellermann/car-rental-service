import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './list-categories-use-case';

export class ListCategoriesController {
  constructor(private ListCategoriesUseCase: ListCategoriesUseCase) {}

  handle(req: Request, res: Response) {
    const categoriesList = this.ListCategoriesUseCase.execute();

    return res.status(201).json({ categoriesList });
  }
}
