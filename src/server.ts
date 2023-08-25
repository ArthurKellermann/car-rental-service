import express from 'express';

import { categoriesRoutes } from './application/routes/categories.routes';

const app = express();

app.use(express.json());

app.use('/', categoriesRoutes);

app.listen(3000, () => {
  console.log('server is running');
});
