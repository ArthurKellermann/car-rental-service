import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '../../../modules/cars/repositories/prisma/prisma-categories-repository';
import '../../container';

import { AppError } from '../errors/app-error';
import router from './routes/index';
import swaggerFile from '../../../swagger.json';
import upload from '../../../config/upload';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

app.use(router);

app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export { app };
