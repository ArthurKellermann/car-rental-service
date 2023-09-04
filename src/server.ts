import express from 'express';
import router from './routes/index';
import swaggerUi from 'swagger-ui-express';
import './database/prisma-categories-repository';
import swaggerFile from './swagger.json';
import './database/prisma-categories-repository';

const app = express();
const port = 3333;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(port, () => {
  console.log('Server is running');
});
