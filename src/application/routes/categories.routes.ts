import { Router } from 'express';
import { v4 as randomUUID } from 'uuid';
import { Category } from '../../model/category';

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post('/', (req, res) => {
  const { name, description } = req.body;

  const category: Category = {
    id: randomUUID(),
    name,
    description,
    created_at: new Date(),
  };

  categories.push(category);

  return res.status(201).json({ categories: categories[0] });
});

export { categoriesRoutes };
