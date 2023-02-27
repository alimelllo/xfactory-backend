import { Express } from 'express';

import { authRouter, userRouter , messageRouter } from '../mvc/routes';
import { Routes } from '../mvc/routes/routesStrings';

export default (app: Express) => {
  app.use('/', authRouter);
  app.use( '/', userRouter);
  app.use('/', messageRouter);
};
