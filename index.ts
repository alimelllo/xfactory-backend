import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/init/routes';
import localize from './src/init/localize';
import db from './src/init/db';
import theApp from './src/init/theApp';

import mongoose from 'mongoose';
import { Game } from './src/mvc/models'

const app: Express = express();

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

const server = app.listen(8081, () => {
  console.log(`⚡️ [server]: Server is running at https://localhost:${8081}`);
});

const io = require('socket.io')(server)

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


// mongoose testing socket //
/////////////////////////////

Game.update({ _id: "63c295dbc1ec60e40b39499a", gameValue: 2 })
.then(() => console.log("succeed")
)
 
Game.find({ _id: "63c295dbc1ec60e40b39499a" })
  .then((data: any) => {
    console.log(data[0].gameValue)
})



//listening to events after the connection is estalished
function connected(socket){
  socket.on('newPlayer', data => {
      console.log("New client connected, with id: "+socket.id);
      players[socket.id] = data;
      console.log("Current number of players: "+Object.keys(players).length);

      // creating room
      socket.on('create', function(room) {
        socket.join(room);
      });
  })
  socket.on('disconnect', function(){
      delete players[socket.id];
      console.log("Goodbye client with id "+socket.id);
      console.log("Current number of players: "+Object.keys(players).length);
  })
  socket.on('ClientClientHello', data => {
      socket.broadcast.emit('ServerClientHello', data);
  })
}

export default app;
