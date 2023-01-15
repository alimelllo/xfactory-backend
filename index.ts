import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/init/routes';
import localize from './src/init/localize';
import db from './src/init/db';
import theApp from './src/init/theApp';
import mongoose from 'mongoose';
import { Game } from './src/mvc/models'
import { assert } from 'console';

const app: Express = express();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const server = app.listen(8081, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${8081}`);
});

const io = require('socket.io')(server , {
  cors: {
    origin: "*",
    methods: ["GET", "POST" , "PUT" , "DELETE"]
  }
})

dotenv.config();

const cors = require('cors');
const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));
theApp(app);
localize(app);
db();
routes(app);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

let players = {};

io.on('connection', connected);





//listening to events after the connection is estalished
function connected(socket){


   // let value =  Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec();
   // value.then(( resp ) => { Game.update({ _id: "63c295dbc1ec60e40b39499a", gameValue: resp[0].gameValue + 1 }).exec().then((rr) => console.log(rr))})
   
    //  setInterval(() => {
 
    //   let value = Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec();
    //   value.then(( resp ) => { Game.update({ _id: "63c295dbc1ec60e40b39499a", gameValue: resp[0].gameValue + 1 }).exec();  console.log(resp[0].gameValue)})
     
    //  }, 1000 )

}  


export default app;
