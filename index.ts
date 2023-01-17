import express, { Express } from 'express';
import dotenv from 'dotenv';
import routes from './src/init/routes';
import localize from './src/init/localize';
import db from './src/init/db';
import theApp from './src/init/theApp';
import mongoose from 'mongoose';
import { Game } from './src/mvc/models'
import { close } from 'fs';

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

io.on('connection', connected);

//listening to events after the connection is estalished
function connected(socket){

//////////////////////////
// Dont Touch This Code //
let gameIsRuning : any = false;

// const getGameStatus = async () => {
//    Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec().then(( resp ) => {
  //  console.log(resp[0])
  


 
    
    // Game.update({ _id: "63c295dbc1ec60e40b39499a", gameIsRuning: true }).exec().then(() => {
  let initNumber = 0;
  let update = null ;
  let realTimeNumber = 0;
  let closeTime ;

  const GenerateNewCloseTime = () => {
    return Math.round(Math.random() * 15) + 1;
  }

  const countUp = async ( reset : boolean ) => { 
    if(reset){

      Game.update({ _id: "63c295dbc1ec60e40b39499a", gameValue: 0 }).exec().then(() => {
           setTimeout( () => handleUpdate(GenerateNewCloseTime()) , 5000)
       }); 
      realTimeNumber = await Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec();
    }
    if(!reset){
       initNumber = await Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec();
       update = await Game.update({ _id: "63c295dbc1ec60e40b39499a", gameValue: +(initNumber[0].gameValue + 0.1 ).toFixed(1) }).exec();
       realTimeNumber = await Game.find({ _id: "63c295dbc1ec60e40b39499a" }).exec();
    }     
  }
// if(resp[0].gameIsRuning === false){
    closeTime = GenerateNewCloseTime();
// }

const handleUpdate = ( closeTime ) => {
  console.log(`close at : ${closeTime}`)
  
  let interval : any = setInterval(function () {
     
    if( realTimeNumber &&  Math.trunc(realTimeNumber[0].gameValue) + 1 === closeTime ){
        clearInterval(interval); 
        countUp(true);
        socket.emit('test' , 'Expired')
        return
        }

    realTimeNumber && console.log(realTimeNumber[0].gameValue);
    
    realTimeNumber && socket.emit('test' , realTimeNumber[0].gameValue );
    countUp(false); 
    }, 300);
}
// if( resp[0].gameIsRuning === false){
   handleUpdate(closeTime);
// }

//     })

//    });
// }


// getGameStatus();



}


// Dont Touch This Code //
//////////////////////////



export default app;
