import { Request, Response } from 'express';
import { ListCategoriesUseCase } from './list-categories-use-case';
import { container } from 'tsyringe';

export class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
    const categoriesList = await listCategoriesUseCase.execute();

    return res.status(201).json({ categoriesList });
  }
}
