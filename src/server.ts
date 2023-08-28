import express from 'express';

import { categoriesRoutes } from './application/routes/categories.routes';
import { specificationsRoutes } from './application/routes/specification.routes';

const app = express();

app.use(express.json());

app.use('/categories', categoriesRoutes);
app.use('/specifications', specificationsRoutes);

app.listen(3000, () => {
  console.log('server is running');
});
