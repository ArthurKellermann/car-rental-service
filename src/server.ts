import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import './database/prisma/repositories/prisma-categories-repository';
import './shared/container';

import { AppError } from './errors/app-error';
import router from './routes/index';
import swaggerFile from './swagger.json';

const app = express();
const port = 3333;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use(
  (err: Error | AppError, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error - ' + err.message,
    });
  },
);

app.listen(port, () => {
  console.log('Server is running');
});
