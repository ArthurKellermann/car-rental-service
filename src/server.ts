import express from 'express';
import router from './routes/index';
import swaggerUi from 'swagger-ui-express';

import swaggerFile from './swagger.json';

const app = express();
const port = 3333;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(port, () => {
  console.log('Server is running');
});
