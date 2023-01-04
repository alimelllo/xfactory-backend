import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/init/routes';
import localize from './src/init/localize';
import db from './src/init/db';
import theApp from './src/init/theApp';

dotenv.config();
const app: Express = express();

const cors = require('cors');
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
theApp(app);
localize(app);
db();
routes(app);

app.listen(8081, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${8081}`);
});
export default app;
